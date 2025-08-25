'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/cosmic'
import ProductFilters from '@/components/ProductFilters'
import ProductGrid from '@/components/ProductGrid'
import { Product } from '@/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const fetchedProducts = await getProducts()
        setProducts(fetchedProducts)
        setFilteredProducts(fetchedProducts)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleFilteredProducts = (filtered: Product[]) => {
    setFilteredProducts(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    )
  }

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

        <ProductFilters 
          products={products}
          onFilteredProducts={handleFilteredProducts}
        />

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
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </div>
  )
}