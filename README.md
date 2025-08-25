# Luxe Fashion Boutique

![App Preview](https://imgix.cosmicjs.com/03f42b00-81e6-11f0-b0ac-f12686cb9ade-photo-1490481651871-ab68de25d43d-1756148535491.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated e-commerce fashion boutique website showcasing luxury products, curated collections, and customer reviews. Built with Next.js and powered by Cosmic CMS for seamless content management.

## Features

- 🛍️ **Product Catalog** - Browse luxury fashion items with detailed specifications
- 📚 **Curated Collections** - Seasonal and themed product groupings
- ⭐ **Customer Reviews** - Authentic feedback with star ratings
- 🔍 **Search & Filter** - Advanced product filtering capabilities
- 📱 **Responsive Design** - Optimized for all devices
- 🚀 **SEO Optimized** - Server-side rendering for better search visibility
- 💎 **Premium Design** - Elegant, minimalist aesthetic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68acb18804ea77b1e31e556d&clone_repository=68acc05204ea77b1e31e55ee)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Content Management**: Cosmic CMS
- **Language**: TypeScript for type safety
- **Package Manager**: Bun for fast installation
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your fashion boutique content

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd luxe-fashion-boutique
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Start the development server
```bash
bun run dev
```

Visit `http://localhost:3000` to see your fashion boutique website.

## Cosmic SDK Examples

### Fetch Products
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with full details
const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured products
const featuredProducts = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.featured': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Fetch Collections
```typescript
// Get active collections with products
const collections = await cosmic.objects
  .find({ 
    type: 'collections',
    'metadata.active': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetch Reviews
```typescript
// Get reviews for a specific product
const reviews = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three main content types:

### Products
- Product name, description, and pricing
- Multiple product images with imgix optimization
- Size and color variations
- Category classification
- Stock status and featured flags

### Collections
- Collection name and rich description
- Hero images for collection branding
- Seasonal categorization
- Product associations

### Reviews
- Customer names and ratings (1-5 stars)
- Detailed review text
- Product associations
- Verification status and recommendations

All content is managed through your Cosmic dashboard and automatically synced with the website.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables
Make sure to set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`

<!-- README_END -->