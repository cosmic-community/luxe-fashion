import { getActiveCollections } from '@/lib/cosmic'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections - Luxe Fashion Boutique',
  description: 'Explore our curated fashion collections featuring the finest luxury pieces for every occasion.',
}

export default async function CollectionsPage() {
  const collections = await getActiveCollections()

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections, each designed to capture 
            the essence of luxury and timeless elegance.
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No collections available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface CollectionCardProps {
  collection: any
}

function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link 
      href={`/collections/${collection.slug}`}
      className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={`${collection.metadata.hero_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={collection.metadata.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition-colors">
            {collection.metadata.name}
          </h3>
          
          {collection.metadata.season && (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {collection.metadata.season.value}
            </span>
          )}
        </div>
        
        <div 
          className="text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: collection.metadata.description 
          }}
        />
        
        {collection.metadata.products && (
          <div className="mt-4 text-sm text-gray-500">
            {collection.metadata.products.length} piece{collection.metadata.products.length !== 1 ? 's' : ''}
          </div>
        )}
        
        <div className="mt-4 flex items-center text-accent font-medium group-hover:text-gray-900 transition-colors">
          Explore Collection
          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}