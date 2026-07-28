import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

type TrackOrderBody = {
  orderNumber?: unknown
  email?: unknown
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  try {
    const body = (await req.json().catch(() => ({}))) as TrackOrderBody
    const orderNumber = typeof body.orderNumber === 'string' ? body.orderNumber.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!orderNumber || orderNumber.length > 64) {
      return json({ error: 'Enter a valid order number.' }, 400)
    }

    if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Enter a valid email address.' }, 400)
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } },
    )

    const { data, error } = await admin.rpc('track_order', {
      p_order_number: orderNumber,
      p_email: email,
    })

    if (error) {
      console.error('track_order rpc failed:', error.message)
      return json({ error: 'Unable to track this order right now.' }, 500)
    }

    return json({ order: Array.isArray(data) ? data[0] ?? null : null })
  } catch (error) {
    console.error('track-order failed:', error)
    return json({ error: 'Unable to track this order right now.' }, 500)
  }
})