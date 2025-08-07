'use client'
import { downloadDataUrl } from '@/lib/image'
export default function DownloadButtons({ designUrl, mockupRef, mannequinRef }:{
  designUrl?: string,
  mockupRef: React.RefObject<HTMLCanvasElement>,
  mannequinRef: React.RefObject<HTMLCanvasElement>
}){
  return (
    <div className=\"flex gap-2 flex-wrap\">
      <button disabled={!designUrl} className=\"px-3 py-2 rounded border\" onClick={()=> designUrl && downloadDataUrl('design.png', designUrl)}>Design PNG</button>
      <button className=\"px-3 py-2 rounded border\" onClick={()=>{ const c=mockupRef.current; if(!c) return; downloadDataUrl('mockup.png', c.toDataURL('image/png'))}}>Mockup PNG</button>
      <button className=\"px-3 py-2 rounded border\" onClick={()=>{ const c=mannequinRef.current; if(!c) return; downloadDataUrl('mannequin.png', c.toDataURL('image/png'))}}>Maniquí PNG</button>
    </div>
  )}
