import { Review } from '@/types'
import { getStarRating } from '@/lib/cosmic'
import Link from 'next/link'

interface ReviewsSectionProps {
  reviews: Review[]
  showProductInfo?: boolean
}

export default function ReviewsSection({ reviews, showProductInfo = true }: ReviewsSectionProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No reviews available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} showProductInfo={showProductInfo} />
      ))}
    </div>
  )
}

interface ReviewCardProps {
  review: Review
  showProductInfo?: boolean
}

function ReviewCard({ review, showProductInfo = true }: ReviewCardProps) {
  const rating = parseInt(review.metadata.rating.key)

  return (
    <div className="card h-full flex flex-col">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">
              {getStarRating(rating)}
            </span>
            <span className="ml-2 font-semibold text-gray-900">
              {review.metadata.rating.value}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {review.metadata.verified_purchase && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                Verified
              </span>
            )}
            {review.metadata.would_recommend && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                Recommends
              </span>
            )}
          </div>
        </div>

        <h4 className="font-semibold text-gray-900 mb-2">
          {review.title}
        </h4>

        <p className="text-gray-700 mb-4 line-clamp-4">
          {review.metadata.review_text}
        </p>

        {showProductInfo && review.metadata.product && (
          <div className="mb-4">
            <Link 
              href={`/products/${review.metadata.product.slug}`}
              className="text-sm text-accent hover:underline font-medium"
            >
              {review.metadata.product.metadata.name}
            </Link>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
        <span className="font-medium">
          {review.metadata.customer_name}
        </span>
        <span>
          {new Date(review.metadata.review_date).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}