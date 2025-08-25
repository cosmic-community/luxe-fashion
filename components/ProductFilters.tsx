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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            type="text"
            placeholder="Search products..."
            value={currentFilters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value=""
                checked={!currentFilters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
              />
              <span className="ml-3 text-sm text-gray-700">All Categories</span>
            </label>
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={currentFilters.category === category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                />
                <span className="ml-3 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value=""
                checked={!currentFilters.priceRange}
                onChange={(e) => updateFilter('priceRange', e.target.value)}
                className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
              />
              <span className="ml-3 text-sm text-gray-700">All Prices</span>
            </label>
            {priceRanges.map(range => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.label}
                  checked={currentFilters.priceRange === range.label}
                  onChange={(e) => updateFilter('priceRange', e.target.value)}
                  className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                />
                <span className="ml-3 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
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
      </div>
    </div>
  )
}