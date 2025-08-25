// app/products/[slug]/page.tsx
import { getProduct, getProductReviews, calculateAverageRating } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ProductGallery from '@/components/ProductGallery'
import ProductDetails from '@/components/ProductDetails'
import ProductReviews from '@/components/ProductReviews'
import { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.metadata.name} - Luxe Fashion Boutique`,
    description: product.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: {
      title: product.metadata.name,
      description: product.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
      images: product.metadata.images.map(img => ({
        url: `${img.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`,
        width: 800,
        height: 600,
      })),
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getProductReviews(product.id)
  const averageRating = calculateAverageRating(reviews)

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded animate-pulse"></div>}>
            <ProductGallery images={product.metadata.images} productName={product.metadata.name} />
          </Suspense>

          <div className="space-y-6">
            <Suspense fallback={<div className="h-64 bg-gray-100 rounded animate-pulse"></div>}>
              <ProductDetails 
                product={product} 
                averageRating={averageRating}
                reviewCount={reviews.length}
              />
            </Suspense>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="border-t pt-12">
            <Suspense fallback={<div className="h-64 bg-gray-100 rounded animate-pulse"></div>}>
              <ProductReviews reviews={reviews} averageRating={averageRating} />
            </Suspense>
          </section>
        )}
      </div>
    </div>
  )
}