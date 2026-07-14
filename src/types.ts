export interface ColorOption {
  name: string;
  hex: string;
  images: string[];
}

export interface SizeOption {
  name: string;
  price: number;
  measurement?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'dog' | 'cat';
  type: 'harness' | 'leash' | 'collar';
  description: string;
  colors: ColorOption[];
  sizes: SizeOption[];
  oneSize?: boolean;
  sizeLabel?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}
