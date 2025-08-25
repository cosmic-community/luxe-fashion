'use client'

import { Product } from '@/types'
import { useState, useMemo } from 'react'

interface ProductFiltersProps {
  products: Product[]
  onFilter?: (filteredProducts: Product[]) => void
}

export default function ProductFilters({ products, onFilter }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = products.map(p => p.metadata.category.value)
    return Array.from(new Set(cats)).sort()
  }, [products])

  const colors = useMemo(() => {
    const allColors = products.flatMap(p => p.metadata.colors)
    return Array.from(new Set(allColors)).sort()
  }, [products])

  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.metadata.price))
  }, [products])

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory && product.metadata.category.value !== selectedCategory) {
        return false
      }
      if (selectedColor && !product.metadata.colors.includes(selectedColor)) {
        return false
      }
      if (product.metadata.price < priceRange[0] || product.metadata.price > priceRange[1]) {
        return false
      }
      if (inStockOnly && !product.metadata.in_stock) {
        return false
      }
      return true
    })
  }, [products, selectedCategory, selectedColor, priceRange, inStockOnly])

  // Call onFilter when filters change
  useMemo(() => {
    onFilter?.(filteredProducts)
  }, [filteredProducts, onFilter])

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedColor('')
    setPriceRange([0, maxPrice])
    setInStockOnly(false)
  }

  return (
    <div className="card sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block font-medium text-sm text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="block font-medium text-sm text-gray-700 mb-2">
            Color
          </label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Colors</option>
            {colors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block font-medium text-sm text-gray-700 mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>

        {/* In Stock Only */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="inStock"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
            In Stock Only
          </label>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>
    </div>
  )
}