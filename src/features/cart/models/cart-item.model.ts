export interface Product {
id: string;
name: string;
imageUrl: string;
price: number;
}


export interface CartItem {
  product: Product;
  quantity: number;
}
