import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Generador de Prendas – MVP',
  description: 'Prototipo de generador de gráficos y mockups de prendas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es"><body>{children}</body></html>
  )
}
