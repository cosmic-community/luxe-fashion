import { getProducts } from '@/lib/cosmic'
import ProductFilters from '@/components/ProductFilters'
import ProductGrid from '@/components/ProductGrid'
import { Product } from '@/types'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Products - Luxe Fashion Boutique',
  description: 'Discover our complete collection of luxury fashion pieces, carefully curated for the modern woman.',
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    priceRange?: string
    sort?: string
    search?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const { category, priceRange, sort = 'name', search } = params

  // Fetch all products server-side
  const allProducts = await getProducts()
  
  // Apply server-side filtering
  const filteredProducts = filterProducts(allProducts, {
    category,
    priceRange,
    sort,
    search
  })

  // Get unique categories for the filter component
  const categories = Array.from(
    new Set(allProducts.map(product => product.metadata.category.value))
  ).sort()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of luxury fashion pieces, 
            carefully curated for the modern woman.
          </p>
        </div>

        <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 animate-pulse h-20"></div>}>
          <ProductFilters 
            categories={categories}
            currentFilters={{
              category: category || '',
              priceRange: priceRange || '',
              sort: sort || 'name',
              search: search || ''
            }}
          />
        </Suspense>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {allProducts.length} products
              </p>
            </div>

            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-96 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            }>
              <ProductGrid products={filteredProducts} />
            </Suspense>
          </>
        )}
      </div>
    </div>
  )
}

// Server-side filtering function
function filterProducts(
  products: Product[], 
  filters: {
    category?: string
    priceRange?: string
    sort?: string
    search?: string
  }
): Product[] {
  let filtered = [...products]

  // Filter by search query
  if (filters.search?.trim()) {
    const query = filters.search.toLowerCase().trim()
    filtered = filtered.filter(product => 
      product.metadata.name.toLowerCase().includes(query) ||
      product.metadata.description.toLowerCase().includes(query) ||
      product.metadata.material?.toLowerCase().includes(query) ||
      product.metadata.category.value.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(product => 
      product.metadata.category.value === filters.category
    )
  }

  // Filter by price range
  if (filters.priceRange) {
    const priceRanges = [
      { label: 'Under $200', min: 0, max: 199 },
      { label: '$200 - $400', min: 200, max: 399 },
      { label: '$400 - $600', min: 400, max: 599 },
      { label: '$600+', min: 600, max: Infinity },
    ]
    
    const range = priceRanges.find(r => r.label === filters.priceRange)
    if (range) {
      filtered = filtered.filter(product => 
        product.metadata.price >= range.min && product.metadata.price <= range.max
      )
    }
  }

  // Sort products
  filtered.sort((a, b) => {
    switch (filters.sort) {
      case 'name':
        return a.metadata.name.localeCompare(b.metadata.name)
      case 'price-low':
        return a.metadata.price - b.metadata.price
      case 'price-high':
        return b.metadata.price - a.metadata.price
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      default:
        return 0
    }
  })

  return filtered
}