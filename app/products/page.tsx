import { getProducts } from '@/lib/cosmic'
import { Suspense } from 'react'
import ProductGrid from '@/components/ProductGrid'
import ProductFilters from '@/components/ProductFilters'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products - Luxe Fashion Boutique',
  description: 'Browse our complete collection of luxury fashion pieces including dresses, tops, outerwear, and accessories.',
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of luxury fashion pieces
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <Suspense fallback={<div className="h-96 bg-gray-100 rounded animate-pulse"></div>}>
              <ProductFilters products={products} />
            </Suspense>
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>}>
              <ProductGrid products={products} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}