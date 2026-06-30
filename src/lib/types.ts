export type ProductDTO = {
  id?: string;
  name: string;
  nameHi?: string | null;
  slug: string;
  description: string;
  descriptionHi?: string | null;
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
  categoryNameHi?: string | null;
};

export type CategoryDTO = {
  name: string;
  nameHi?: string | null;
  slug: string;
  emoji: string;
  tagline: string;
  taglineHi?: string | null;
  count?: number;
};
