import { createClient } from 'npm:@supabase/supabase-js@2'

const SHOPIFY_SHOP_DOMAIN = '86z1ah-wz.myshopify.com'
const SHOPIFY_API_VERSION = '2026-04'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-sync-key',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

type ShopifyOrder = {
  id: number
  name: string
  order_number: number
  email: string | null
  contact_email: string | null
  created_at: string
  financial_status: string | null
  fulfillment_status: string | null
  customer?: { first_name?: string | null; last_name?: string | null } | null
  line_items?: Array<{ quantity: number }>
  fulfillments?: Array<{
    created_at: string
    tracking_number: string | null
    tracking_url: string | null
    tracking_company: string | null
  }>
}

async function getAccessToken(admin: ReturnType<typeof createClient>) {
  const { data } = await admin
    .from('shopify_tokens')
    .select('access_token')
    .eq('shop_domain', SHOPIFY_SHOP_DOMAIN)
    .maybeSingle()
  return (data?.access_token as string | undefined) ?? Deno.env.get('SHOPIFY_ACCESS_TOKEN') ?? ''
}

let lastRun = 0

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ success: false, message: 'Method not allowed' }, 405)

  // Public but harmless: pulls read-only order data from Shopify and upserts it.
  // Throttled so it can't be used to hammer the Shopify Admin API.
  const now = Date.now()
  if (now - lastRun < 30_000) {
    return json({ success: true, message: 'Recently synced, skipping', synced: 0 })
  }
  lastRun = now

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } },
  )

  const token = await getAccessToken(admin)
  if (!token) return json({ success: false, message: 'Missing Shopify access token' }, 500)

  const body = (await req.json().catch(() => ({}))) as { since?: string; limit?: number }
  const since = typeof body.since === 'string' ? body.since : '2020-01-01T00:00:00Z'

  let url =
    `https://${SHOPIFY_SHOP_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders.json` +
    `?status=any&limit=250&created_at_min=${encodeURIComponent(since)}`

  let synced = 0
  const errors: string[] = []

  while (url) {
    const res = await fetch(url, {
      headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
      return json({ success: false, message: `Shopify API error ${res.status}`, synced }, 502)
    }
    const payload = (await res.json()) as { orders: ShopifyOrder[] }

    const rows = (payload.orders ?? []).map((o) => {
      const fulfillment = o.fulfillments?.[0]
      const qty = (o.line_items ?? []).reduce((sum, li) => sum + (li.quantity ?? 0), 0) || 1
      const name = [o.customer?.first_name, o.customer?.last_name].filter(Boolean).join(' ')
      return {
        shopify_order_id: o.id,
        order_number: String(o.order_number ?? o.name).replace(/^#/, ''),
        email: (o.email ?? o.contact_email ?? '').toLowerCase(),
        customer_name: name || null,
        quantity: qty,
        placed_at: o.created_at,
        financial_status: o.financial_status,
        fulfillment_status: o.fulfillment_status ?? 'unfulfilled',
        tracking_number: fulfillment?.tracking_number ?? null,
        tracking_url: fulfillment?.tracking_url ?? null,
        tracking_company: fulfillment?.tracking_company ?? null,
        shipped_at: o.fulfillment_status === 'fulfilled' ? fulfillment?.created_at ?? null : null,
        updated_at: new Date().toISOString(),
      }
    }).filter((r) => r.email)

    if (rows.length) {
      const { error } = await admin.from('orders').upsert(rows, { onConflict: 'shopify_order_id' })
      if (error) errors.push(error.message)
      else synced += rows.length
    }

    const link = res.headers.get('link') ?? ''
    const next = link.split(',').find((p) => p.includes('rel="next"'))
    url = next ? (next.match(/<([^>]+)>/)?.[1] ?? '') : ''
  }

  const { error: rpcError } = await admin.rpc('recompute_queue')
  if (rpcError) errors.push(rpcError.message)

  return json({ success: errors.length === 0, synced, errors })
})
