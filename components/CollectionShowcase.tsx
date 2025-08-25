import Link from 'next/link'
import { Collection } from '@/types'

interface CollectionShowcaseProps {
  collections: Collection[]
}

export default function CollectionShowcase({ collections }: CollectionShowcaseProps) {
  if (collections.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No collections available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
}

interface CollectionCardProps {
  collection: Collection
}

function CollectionCard({ collection }: CollectionCardProps) {
  const productCount = collection.metadata.products?.length || 0

  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="card p-0 overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={`${collection.metadata.hero_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={collection.metadata.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width="400"
            height="300"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              View Collection
            </span>
          </div>

          {collection.metadata.season && (
            <div className="absolute top-4 left-4">
              <span className="bg-white bg-opacity-90 text-gray-900 px-3 py-1 text-sm font-semibold rounded-full">
                {collection.metadata.season.value}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            {collection.metadata.name}
          </h3>
          
          <div 
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: collection.metadata.description.replace(/<[^>]*>/g, '').slice(0, 120) + '...'
            }}
          />
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {productCount} product{productCount !== 1 ? 's' : ''}
            </span>
            <span className="text-accent font-semibold group-hover:underline">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}