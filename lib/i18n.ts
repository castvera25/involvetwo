export type Lang = 'es' | 'en'
export const t = (lang: Lang) => ({
  title: lang === 'es' ? 'Generador de Imagen para Prendas' : 'Garment Graphic Generator',
  product: lang === 'es' ? 'Prenda' : 'Garment',
  color: lang === 'es' ? 'Color' : 'Color',
  technique: lang === 'es' ? 'Técnica' : 'Technique',
  print: lang === 'es' ? 'Estampado' : 'Print',
  embroidery: lang === 'es' ? 'Bordado' : 'Embroidery',
  prompt: lang === 'es' ? 'Describe tu imagen' : 'Describe your image',
  generate: lang === 'es' ? 'Generar' : 'Generate',
  size: lang === 'es' ? 'Tamaño' : 'Size',
  position: lang === 'es' ? 'Posición' : 'Position',
  downloads: lang === 'es' ? 'Descargas' : 'Downloads',
})
