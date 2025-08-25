import Link from 'next/link'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  className?: string
}

export default function ProductGrid({ products, className = '' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No products found.</p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.metadata.images[0]
  
  if (!mainImage) {
    return null
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card p-0 overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={`${mainImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={product.metadata.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            width="300"
            height="300"
          />
          
          {product.metadata.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}
          
          {!product.metadata.in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-700 transition-colors">
            {product.metadata.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.metadata.price}
            </span>
            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {product.metadata.category.value}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {product.metadata.colors.slice(0, 3).map((color, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {color}
              </span>
            ))}
            {product.metadata.colors.length > 3 && (
              <span className="text-xs text-gray-500">
                +{product.metadata.colors.length - 3} more
              </span>
            )}
          </div>
          
          {product.metadata.material && (
            <p className="text-sm text-gray-600 mt-2">
              {product.metadata.material}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}