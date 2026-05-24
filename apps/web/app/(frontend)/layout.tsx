import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Work4Change',
  description: 'Career platform for the non-profit and impact sectors across Asia and Pacific.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
