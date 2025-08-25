// app/collections/[slug]/page.tsx
import { getCollection } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ProductGrid from '@/components/ProductGrid'
import { Metadata } from 'next'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    return {
      title: 'Collection Not Found',
      description: 'The requested collection could not be found.',
    }
  }

  return {
    title: `${collection.metadata.name} - Luxe Fashion Boutique`,
    description: collection.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
    openGraph: {
      title: collection.metadata.name,
      description: collection.metadata.description.replace(/<[^>]*>/g, '').slice(0, 160),
      images: [{
        url: `${collection.metadata.hero_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`,
        width: 1200,
        height: 600,
      }],
    },
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    notFound()
  }

  const products = collection.metadata.products || []

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Hero */}
      <section className="relative h-96 md:h-[32rem] overflow-hidden">
        <img
          src={`${collection.metadata.hero_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
          alt={collection.metadata.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {collection.metadata.name}
            </h1>
            {collection.metadata.season && (
              <p className="text-lg md:text-xl mb-6 opacity-90">
                {collection.metadata.season.value} Collection
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Collection Description */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div 
              className="text-lg text-gray-600 prose prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: collection.metadata.description }}
            />
          </div>

          {products.length > 0 ? (
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-96 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            }>
              <ProductGrid products={products} />
            </Suspense>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                This collection is currently being curated. Check back soon for new arrivals.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}