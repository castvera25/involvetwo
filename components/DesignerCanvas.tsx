'use client'
import { useEffect, useRef } from 'react'
import { Product } from '@/lib/drawing'

function mockupPath(product: Product, color: string){
  const map: Record<string,string> = {
    '#ffffff': 'white', '#111111':'black', '#b7b7b7':'heather', '#0b1a33':'navy',
    '#b31818':'red', '#5b6b43':'olive', '#e7ddc9':'beige'
  }
  const key = map[color] ?? 'white'
  return `/mockups/${product}/${key}.png`
}

export default function DesignerCanvas({ product, color, graphicDataUrl, scale, yOffset }:{
  product: Product,
  color: string,
  graphicDataUrl?: string,
  scale: number,
  yOffset: number,
}){
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const c = ref.current!, ctx = c.getContext('2d')!, W=800,H=900
    c.width=W; c.height=H; ctx.clearRect(0,0,W,H)
    const mock = new Image(); mock.onload=()=>{
      ctx.drawImage(mock,0,0,W,H)
      if(graphicDataUrl){
        const g = new Image(); g.onload=()=>{
          const maxW = product==='tote'? 360 : product==='cap'? 240 : 360
          const maxH = product==='tote'? 360 : product==='cap'? 140 : 360
          const w=g.width,h=g.height
          const s=Math.min(maxW/w,maxH/h)*scale
          const dw=w*s, dh=h*s
          const x=(W-dw)/2
          const baseY = product==='cap'? 420 : product==='hoodie'? 360 : product==='tote'? 330 : 340
          const y = baseY - dh/2 + yOffset
          ctx.drawImage(g,x,y,dw,dh)
        }; g.src = graphicDataUrl
      }
    }
    mock.src = mockupPath(product,color)
  },[product,color,graphicDataUrl,scale,yOffset])
  return <canvas ref={ref} className=\"w-full max-w-[400px] border rounded\" />
}
