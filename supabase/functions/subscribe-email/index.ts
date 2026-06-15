import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const SHOPIFY_SHOP_DOMAIN = '86z1ah-wz.myshopify.com'
const SHOPIFY_API_VERSION = '2026-04'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json().catch(() => null) as { email?: unknown; source?: unknown } | null
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const source = typeof body?.source === 'string' && body.source ? body.source : 'landing-popup'

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data: tokenRow, error: tokenErr } = await supabase
      .from('shopify_tokens')
      .select('access_token')
      .eq('shop_domain', SHOPIFY_SHOP_DOMAIN)
      .maybeSingle()

    if (tokenErr) {
      console.error('Token lookup error:', tokenErr)
      return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!tokenRow?.access_token) {
      console.error('No Shopify token stored yet — install not completed for', SHOPIFY_SHOP_DOMAIN)
      return new Response(
        JSON.stringify({ success: false, message: 'Subscription service not yet available' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const shopifyRes = await fetch(
      `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/customers.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': tokenRow.access_token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            email,
            email_marketing_consent: {
              state: 'subscribed',
              opt_in_level: 'single_opt_in',
              consent_updated_at: new Date().toISOString(),
            },
            tags: `frequency-fam, popup-signup, ${source}`,
          },
        }),
      },
    )

    if (shopifyRes.ok) {
      console.log('Created Shopify customer:', email)
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Handle "email already taken" as success
    if (shopifyRes.status === 422) {
      const errJson = await shopifyRes.json().catch(() => ({}))
      const errs = JSON.stringify(errJson).toLowerCase()
      if (errs.includes('has already been taken') || errs.includes('email')) {
        console.log('Customer already exists (treated as success):', email)
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      console.error('Shopify 422 (non-duplicate):', errJson)
    } else {
      const errText = await shopifyRes.text()
      console.error('Shopify API error:', shopifyRes.status, errText)
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Could not save email. Please try again.' }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    console.error('Unhandled error in subscribe-email:', e)
    return new Response(
      JSON.stringify({ success: false, message: 'Server error. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
