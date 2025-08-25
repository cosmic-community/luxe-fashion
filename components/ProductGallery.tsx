'use client'

import { useState } from 'react'

interface ProductGalleryProps {
  images: Array<{
    url: string
    imgix_url: string
  }>
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
        {selectedImage && (
          <img
            src={`${selectedImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`aspect-square overflow-hidden rounded-md border-2 transition-all duration-200 ${
                selectedImage?.imgix_url === image.imgix_url
                  ? 'border-black'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${productName} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}