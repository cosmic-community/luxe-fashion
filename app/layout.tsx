import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Luxe Fashion Boutique - Premium Fashion & Accessories',
  description: 'Discover luxury fashion pieces crafted with exceptional quality. From silk dresses to cashmere coats, elevate your wardrobe with our curated collections.',
  keywords: 'luxury fashion, designer clothing, silk dresses, cashmere coats, premium accessories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Emoji favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👗</text></svg>" />
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className="min-h-screen bg-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}