
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string | null;
}

export interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}
