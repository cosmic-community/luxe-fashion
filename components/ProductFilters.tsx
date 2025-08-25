'use client'

import { useState, useEffect } from 'react'

interface ProductFiltersProps {
  products: any[]
  onFilteredProducts: (filteredProducts: any[]) => void
}

export default function ProductFilters({ products, onFilteredProducts }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('name')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Get unique categories from products
  const categories = Array.from(
    new Set(products.map(product => product.metadata.category.value))
  ).sort()

  // Price ranges
  const priceRanges = [
    { label: 'Under $200', min: 0, max: 199 },
    { label: '$200 - $400', min: 200, max: 399 },
    { label: '$400 - $600', min: 400, max: 599 },
    { label: '$600+', min: 600, max: Infinity },
  ]

  useEffect(() => {
    let filtered = [...products]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(product => 
        product.metadata.name.toLowerCase().includes(query) ||
        product.metadata.description.toLowerCase().includes(query) ||
        product.metadata.material?.toLowerCase().includes(query) ||
        product.metadata.category.value.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.metadata.category.value === selectedCategory
      )
    }

    // Filter by price range
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.label === selectedPriceRange)
      if (range) {
        filtered = filtered.filter(product => 
          product.metadata.price >= range.min && product.metadata.price <= range.max
        )
      }
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
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

    onFilteredProducts(filtered)
  }, [products, selectedCategory, selectedPriceRange, sortBy, searchQuery])

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedPriceRange('')
    setSortBy('name')
    setSearchQuery('')
  }

  const hasActiveFilters = selectedCategory || selectedPriceRange || searchQuery || sortBy !== 'name'

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        {/* Category Filter */}
        <div className="min-w-[180px]">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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