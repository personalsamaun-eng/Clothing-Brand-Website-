export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  details?: string[];
  specs?: { label: string; value: string }[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}
