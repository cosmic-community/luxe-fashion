import { Product } from '@/types'
import { getStarRating } from '@/lib/cosmic'

interface ProductDetailsProps {
  product: Product
  averageRating: number
  reviewCount: number
}

export default function ProductDetails({ product, averageRating, reviewCount }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {product.metadata.name}
        </h1>
        
        {reviewCount > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <span className="text-yellow-400 text-lg">
                {getStarRating(averageRating)}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="text-3xl font-bold text-gray-900">
        ${product.metadata.price}
      </div>

      {product.metadata.description && (
        <div 
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: product.metadata.description }}
        />
      )}

      {/* Product Details */}
      <div className="space-y-4">
        {product.metadata.material && (
          <div className="flex items-center justify-between py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">Material:</span>
            <span className="text-gray-900">{product.metadata.material}</span>
          </div>
        )}

        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Category:</span>
          <span className="text-gray-900">{product.metadata.category.value}</span>
        </div>

        <div className="flex items-start justify-between py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Available Colors:</span>
          <div className="flex flex-wrap gap-1 max-w-48">
            {product.metadata.colors.map((color, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-start justify-between py-2 border-b border-gray-200">
          <span className="font-medium text-gray-700">Available Sizes:</span>
          <div className="flex flex-wrap gap-1 max-w-48">
            {product.metadata.sizes.map((size, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="font-medium text-gray-700">Availability:</span>
          <span className={`font-medium ${
            product.metadata.in_stock ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.metadata.in_stock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="space-y-4 pt-6">
        <button 
          disabled={!product.metadata.in_stock}
          className={`w-full py-4 px-8 rounded-md font-semibold text-lg transition-colors ${
            product.metadata.in_stock
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.metadata.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </button>
        
        <p className="text-sm text-gray-600 text-center">
          Free shipping on orders over $200
        </p>
      </div>
    </div>
  )
}