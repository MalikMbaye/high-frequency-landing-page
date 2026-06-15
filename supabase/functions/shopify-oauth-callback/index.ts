import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const SHOPIFY_CLIENT_ID = 'f21428a8b33f84605264812dc1185954'
const SHOPIFY_SHOP_DOMAIN = '86z1ah-wz.myshopify.com'

async function verifyHmac(params: URLSearchParams, secret: string): Promise<boolean> {
  const hmac = params.get('hmac')
  if (!hmac) return false

  // Build sorted message excluding hmac & signature
  const entries: [string, string][] = []
  for (const [k, v] of params.entries()) {
    if (k === 'hmac' || k === 'signature') continue
    entries.push([k, v])
  }
  entries.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  const message = entries.map(([k, v]) => `${k}=${v}`).join('&')

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  const computed = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  // Timing-safe compare
  if (computed.length !== hmac.length) return false
  let mismatch = 0
  for (let i = 0; i < computed.length; i++) mismatch |= computed.charCodeAt(i) ^ hmac.charCodeAt(i)
  return mismatch === 0
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const params = url.searchParams
    const code = params.get('code')
    const shop = params.get('shop')

    if (!code || !shop) {
      return new Response('Missing required parameters', { status: 400, headers: corsHeaders })
    }

    const clientSecret = Deno.env.get('SHOPIFY_CUSTOM_APP_CLIENT_SECRET')
    if (!clientSecret) {
      console.error('SHOPIFY_CUSTOM_APP_CLIENT_SECRET not configured')
      return new Response('Server misconfiguration', { status: 500, headers: corsHeaders })
    }

    // 1. Verify HMAC
    const hmacValid = await verifyHmac(params, clientSecret)
    if (!hmacValid) {
      console.error('HMAC verification failed for shop:', shop)
      return new Response('Invalid HMAC', { status: 401, headers: corsHeaders })
    }

    // 2. Verify shop matches expected
    if (shop !== SHOPIFY_SHOP_DOMAIN) {
      console.error('Shop mismatch:', shop, 'expected:', SHOPIFY_SHOP_DOMAIN)
      return new Response('Unauthorized shop', { status: 401, headers: corsHeaders })
    }

    // 3. Exchange code for access token
    const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: SHOPIFY_CLIENT_ID,
        client_secret: clientSecret,
        code,
      }),
    })

    if (!tokenRes.ok) {
      const errText = await tokenRes.text()
      console.error('Token exchange failed:', tokenRes.status, errText)
      return new Response('Token exchange failed', { status: 502, headers: corsHeaders })
    }

    const tokenJson = await tokenRes.json() as { access_token: string; scope?: string }
    if (!tokenJson.access_token) {
      console.error('No access_token in response:', tokenJson)
      return new Response('Invalid token response', { status: 502, headers: corsHeaders })
    }

    // 4. UPSERT into shopify_tokens
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { error: upsertErr } = await supabase
      .from('shopify_tokens')
      .upsert(
        {
          shop_domain: shop,
          access_token: tokenJson.access_token,
          scope: tokenJson.scope ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'shop_domain' },
      )

    if (upsertErr) {
      console.error('Token upsert failed:', upsertErr)
      return new Response('Failed to store token', { status: 500, headers: corsHeaders })
    }

    console.log('Successfully stored Shopify token for shop:', shop)

    // 5. Redirect merchant browser to success page
    const successUrl = `https://${url.host.replace(/^[^.]+\./, '').includes('supabase') ? 'highfrequencyheadphones.com' : url.host}/shopify-installed`
    // Safer fallback: redirect back to the storefront
    return Response.redirect('https://highfrequencyheadphones.com/shopify-installed', 302)
  } catch (e) {
    console.error('Unhandled error in shopify-oauth-callback:', e)
    return new Response('Internal server error', { status: 500, headers: corsHeaders })
  }
})
