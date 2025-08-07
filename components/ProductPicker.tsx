'use client'
import { Product, productLabel } from '@/lib/drawing'

export default function ProductPicker({ value, onChange }:{ value: Product, onChange:(p:Product)=>void }){
  const products: Product[] = ['tee','hoodie','tote','cap']
  return (
    <div className="flex gap-2 flex-wrap">
      {products.map(p=> (
        <button key={p} onClick={()=>onChange(p)}
          className={`px-3 py-2 rounded border ${value===p? 'bg-black text-white' : 'bg-white'}`}>
          {productLabel(p)}
        </button>
      ))}
    </div>
  )
}
