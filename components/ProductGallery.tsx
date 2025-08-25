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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  const selectedImage = images[selectedImageIndex]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={`${selectedImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          className="w-full h-full object-cover"
          width="400"
          height="400"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === selectedImageIndex
                  ? 'border-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                width="80"
                height="80"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}