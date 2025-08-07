import { NextRequest, NextResponse } from 'next/server'

const REPLICATE_ENDPOINT = 'https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions'

export async function POST(req: NextRequest) {
  try {
    const { prompt, tech } = await req.json() as { prompt: string, tech: 'print'|'embroidery' }
    const body = { input: { prompt, output_format: 'png', width: 768, height: 768, num_outputs: 1 } }
    const pred = await fetch(REPLICATE_ENDPOINT, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if(!pred.ok) throw new Error('Replicate request failed')
    const predJson = await pred.json()
    let url = predJson.urls.get as string
    let outputUrl: string | null = null
    for(let i=0;i<30;i++){
      const st = await fetch(url, { headers: { 'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}` } })
      const sj = await st.json()
      if(sj.status === 'succeeded') { outputUrl = sj.output?.[0]; break }
      if(sj.status === 'failed') throw new Error('Generation failed')
      await new Promise(r=>setTimeout(r, 2000))
    }
    if(!outputUrl) throw new Error('Timeout waiting image')
    const imgRes = await fetch(outputUrl)
    const buf = Buffer.from(await imgRes.arrayBuffer())
    const dataUrl = `data:image/png;base64,${buf.toString('base64')}`
    const svg = tech === 'embroidery' ? `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="768"><image href="${dataUrl}" width="768" height="768"/></svg>` : undefined
    return NextResponse.json({ image: dataUrl, svg })
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
