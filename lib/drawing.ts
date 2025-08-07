export type Product = 'tee' | 'hoodie' | 'tote' | 'cap'
export type Technique = 'print' | 'embroidery'

export const COLORS = [
  { key: 'white', name: 'Blanco', hex: '#ffffff' },
  { key: 'black', name: 'Negro', hex: '#111111' },
  { key: 'heather', name: 'Gris jaspe', hex: '#b7b7b7' },
  { key: 'navy', name: 'Azul marino', hex: '#0b1a33' },
  { key: 'red', name: 'Rojo', hex: '#b31818' },
  { key: 'olive', name: 'Verde oliva', hex: '#5b6b43' },
  { key: 'beige', name: 'Beige', hex: '#e7ddc9' }
]

export function productLabel(p: Product) {
  return { tee: 'Polo', hoodie: 'Hoodie', tote: 'Tote bag', cap: 'Gorra' }[p]
}
