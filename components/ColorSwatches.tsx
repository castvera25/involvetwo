'use client'
import { COLORS } from '@/lib/drawing'

export default function ColorSwatches({ value, onChange }:{ value:string, onChange:(hex:string)=>void }){
  return (
    <div className="flex gap-3 items-center flex-wrap">
      {COLORS.map(c=> (
        <button key={c.key} onClick={()=>onChange(c.hex)} title={c.name}
          className={`w-7 h-7 rounded-full border`} style={{background:c.hex, outline: value===c.hex? '2px solid #000' : 'none'}}/>
      ))}
    </div>
  )
}
