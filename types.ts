// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product object type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description: string;
    price: number;
    images: Array<{
      url: string;
      imgix_url: string;
    }>;
    sizes: string[];
    colors: string[];
    material?: string;
    category: {
      key: string;
      value: string;
    };
    in_stock: boolean;
    featured?: boolean;
  };
}

// Collection object type
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    name: string;
    description: string;
    hero_image: {
      url: string;
      imgix_url: string;
    };
    products?: Product[];
    season?: {
      key: string;
      value: string;
    };
    active: boolean;
  };
}

// Review object type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    customer_name: string;
    rating: {
      key: string;
      value: string;
    };
    review_text: string;
    product: Product;
    review_date: string;
    verified_purchase: boolean;
    would_recommend?: boolean;
  };
}

// Type literals for select-dropdown values
export type ProductCategory = 'dresses' | 'tops' | 'bottoms' | 'outerwear' | 'accessories' | 'shoes';
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'year-round';
export type Rating = '1' | '2' | '3' | '4' | '5';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Utility types
export type ProductWithReviews = Product & {
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
};

export type CollectionWithProducts = Collection & {
  productCount?: number;
};