'use client'
import { useRef, useState } from 'react'
import ProductPicker from '@/components/ProductPicker'
import ColorSwatches from '@/components/ColorSwatches'
import DesignerCanvas from '@/components/DesignerCanvas'
import Mannequin from '@/components/Mannequin'
import DownloadButtons from '@/components/DownloadButtons'
import { Product, Technique } from '@/lib/drawing'
import { t, Lang } from '@/lib/i18n'

export default function Home(){
  const [lang, setLang] = useState<Lang>('es')
  const i = t(lang)
  const [product, setProduct] = useState<Product>('tee')
  const [color, setColor] = useState<string>('#ffffff')
  const [tech, setTech] = useState<Technique>('print')
  const [prompt, setPrompt] = useState('Ilustración minimalista de montaña con luna, trazo fino')
  const [designUrl, setDesignUrl] = useState<string | undefined>()
  const [scale, setScale] = useState(1)
  const [yOffset, setYOffset] = useState(0)
  const mockupRef = useRef<HTMLCanvasElement>(null)
  const mannequinRef = useRef<HTMLCanvasElement>(null)

  async function generate(){
    setDesignUrl(undefined)
    const res = await fetch('/api/generate', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ prompt, tech }) })
    const data = await res.json()
    if(data.image) setDesignUrl(data.image)
  }

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{i.title}</h1>
        <div className="flex gap-2">
          <button className={`px-2 py-1 border rounded ${lang==='es'&&'bg-black text-white'}`} onClick={()=>setLang('es')}>ES</button>
          <button className={`px-2 py-1 border rounded ${lang==='en'&&'bg-black text-white'}`} onClick={()=>setLang('en')}>EN</button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">{i.product}</label>
            <ProductPicker value={product} onChange={setProduct} />
          </div>
          <div>
            <label className="block text-sm mb-1">{i.color}</label>
            <ColorSwatches value={color} onChange={setColor} />
          </div>
          <div>
            <label className="block text-sm mb-1">{i.prompt}</label>
            <textarea className="w-full border rounded p-2" rows={4} value={prompt} onChange={e=>setPrompt(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-2">{i.technique}</label>
            <div className="flex gap-2">
              <button onClick={()=>setTech('print')} className={`px-3 py-2 rounded border ${tech==='print'?'bg-black text-white':''}`}>{i.print}</button>
              <button onClick={()=>setTech('embroidery')} className={`px-3 py-2 rounded border ${tech==='embroidery'?'bg-black text-white':''}`}>{i.embroidery}</button>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm mb-1">{i.size}: {Math.round(scale*100)}%</label>
              <input type="range" min={0.5} max={1.5} step={0.01} value={scale} onChange={e=>setScale(parseFloat(e.target.value))} className="w-full" />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">{i.position}: {yOffset}px</label>
              <input type="range" min={-80} max={80} step={1} value={yOffset} onChange={e=>setYOffset(parseInt(e.target.value))} className="w-full" />
            </div>
          </div>
          <button onClick={generate} className="px-4 py-2 rounded bg-black text-white">{i.generate}</button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Mockup</p>
            <DesignerCanvas product={product} color={color} graphicDataUrl={designUrl} scale={scale} yOffset={yOffset} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Maniquí</p>
            <Mannequin product={product} color={color} graphicDataUrl={designUrl} />
          </div>
        </div>
      </section>

      <footer className="mt-6">
        <DownloadButtons designUrl={designUrl} mockupRef={{current:null}} mannequinRef={{current:null}} />
      </footer>
    </main>
  )
}
