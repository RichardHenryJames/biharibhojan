export type ProductDTO = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  isVeg: boolean;
  spiceLevel: number;
  isBestseller?: boolean;
  isSignature?: boolean;
  rating: number;
  reviews: number;
  prepTime: number;
  serves: string;
  region?: string | null;
  tags: string[];
  categorySlug: string;
  categoryName: string;
};

export type CategoryDTO = {
  name: string;
  slug: string;
  emoji: string;
  tagline: string;
  count?: number;
};
