import { CartItem } from "./CartItem";

export interface CartDto {
    items: CartItem[];
    total: number;
  }