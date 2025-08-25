import { getFeaturedProducts, getActiveCollections, getReviews } from '@/lib/cosmic'
import { Suspense } from 'react'
import ProductGrid from '@/components/ProductGrid'
import CollectionShowcase from '@/components/CollectionShowcase'
import ReviewsSection from '@/components/ReviewsSection'
import Hero from '@/components/Hero'
import Loading from './loading'

export default async function HomePage() {
  const [featuredProducts, collections, reviews] = await Promise.all([
    getFeaturedProducts(),
    getActiveCollections(),
    getReviews()
  ])

  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <Hero />
        
        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Collection
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our carefully selected premium pieces, each crafted with exceptional attention to detail and timeless elegance.
              </p>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        {/* Collections Showcase */}
        {collections.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Curated Collections
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore our seasonal collections, each telling a unique story through carefully curated pieces.
                </p>
              </div>
              <CollectionShowcase collections={collections} />
            </div>
          </section>
        )}

        {/* Customer Reviews */}
        {reviews.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What Our Customers Say
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Real experiences from our valued customers who trust our quality and craftsmanship.
                </p>
              </div>
              <ReviewsSection reviews={reviews.slice(0, 6)} />
            </div>
          </section>
        )}
      </Suspense>
    </div>
  )
}