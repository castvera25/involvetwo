'use client'
import { useEffect, useRef } from 'react'
import { Product } from '@/lib/drawing'

function mannequinPath(){ return '/mannequins/unisex.png' }
function mockupPath(product: Product, color: string){
  const map: Record<string,string> = {
    '#ffffff': 'white', '#111111':'black', '#b7b7b7':'heather', '#0b1a33':'navy',
    '#b31818':'red', '#5b6b43':'olive', '#e7ddc9':'beige'
  }
  const key = map[color] ?? 'white'
  return `/mockups/${product}/${key}.png`
}

export default function Mannequin({ product, color, graphicDataUrl }:{ product:Product, color:string, graphicDataUrl?:string }){
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const c = ref.current!, ctx=c.getContext('2d')!, W=800,H=900
    c.width=W; c.height=H; ctx.clearRect(0,0,W,H)
    const m = new Image(); m.onload=()=>{
      ctx.drawImage(m,0,0,W,H)
      const mock = new Image(); mock.onload=()=>{
        ctx.drawImage(mock,0,0,W,H)
        if(graphicDataUrl){ const g=new Image(); g.onload=()=>{
          const dw=300, dh=(g.height/g.width)*dw; ctx.drawImage(g,250,360,dw,dh)}; g.src=graphicDataUrl }
      }; mock.src = mockupPath(product,color)
    }; m.src = mannequinPath()
  },[product,color,graphicDataUrl])
  return <canvas ref={ref} className=\"w-full max-w-[400px] border rounded\" />
}
