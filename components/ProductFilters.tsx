'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface ProductFiltersProps {
  categories: string[]
  currentFilters: {
    category: string
    priceRange: string
    sort: string
    search: string
  }
}

export default function ProductFilters({ categories, currentFilters }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Price ranges
  const priceRanges = [
    { label: 'Under $200', min: 0, max: 199 },
    { label: '$200 - $400', min: 200, max: 399 },
    { label: '$400 - $600', min: 400, max: 599 },
    { label: '$600+', min: 600, max: Infinity },
  ]

  // Create URL with updated parameters
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  // Update filters
  const updateFilter = (name: string, value: string) => {
    const queryString = createQueryString(name, value)
    router.push(`/products?${queryString}`)
  }

  // Clear all filters
  const clearFilters = () => {
    router.push('/products')
  }

  const hasActiveFilters = currentFilters.category || currentFilters.priceRange || currentFilters.search || currentFilters.sort !== 'name'

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={currentFilters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        {/* Category Filter */}
        <div className="min-w-[180px]">
          <select
            value={currentFilters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="min-w-[180px]">
          <select
            value={currentFilters.priceRange}
            onChange={(e) => updateFilter('priceRange', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="">All Prices</option>
            {priceRanges.map(range => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="min-w-[180px]">
          <select
            value={currentFilters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}