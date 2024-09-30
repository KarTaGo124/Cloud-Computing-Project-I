import { Product } from "./product";

export interface OrderProduct {
  product_id: string;
  quantity: number;
}

export interface Order {
  id: number;
  customer_id: number;
  order_date: Date;
  status: number;
}

export interface CartItem extends Product {
  quantity: number;
}
