import { Review } from '@/types'
import { getStarRating } from '@/lib/cosmic'

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
}

export default function ProductReviews({ reviews, averageRating }: ProductReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 text-xl">
            {getStarRating(averageRating)}
          </span>
          <span className="text-lg font-semibold text-gray-900">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-gray-600">
            ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

interface ReviewCardProps {
  review: Review
}

function ReviewCard({ review }: ReviewCardProps) {
  const rating = parseInt(review.metadata.rating.key)
  
  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            {review.metadata.customer_name}
          </h4>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400">
              {getStarRating(rating)}
            </span>
            <span className="text-sm text-gray-600">
              {new Date(review.metadata.review_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {review.metadata.verified_purchase && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                Verified Purchase
              </span>
            )}
            {review.metadata.would_recommend && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                Recommends
              </span>
            )}
          </div>
        </div>
      </div>
      
      <h5 className="font-medium text-gray-900 mb-2">
        {review.title}
      </h5>
      
      <p className="text-gray-700 leading-relaxed">
        {review.metadata.review_text}
      </p>
    </div>
  )
}