import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CartItem } from '../interfaces/CartItem';
import { ResponseAPIGetAllProducts } from '../../Products/interfaces/ResponseAPIGetAllProducts';
import { CartDto } from '../interfaces/CartDto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = "http://localhost:5042/api/Cart";
  private cartSubject = new BehaviorSubject<CartDto>({ items: [], total: 0 });
  
  constructor(private http: HttpClient) {
    this.loadCart();
  }
  // Load cart from backend
  async loadCart() {
    try {
      console.log('Loading cart...');
      const response = await firstValueFrom(
        this.http.get<CartDto>(this.baseUrl, {withCredentials: true})
      );
      console.log('Cart loaded:', response);
      this.cartSubject.next(response);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }

  // Get cart as observable
  getCart() {
    return this.cartSubject.asObservable();
  }

  // Add item to cart
  async addToCart(productId: string) {
    try {
      console.log('Adding product to cart:', Number(productId));
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}/add`, Number(productId), {withCredentials: true})
      );
      console.log('Add to cart response:', response);
      await this.loadCart(); // Reload cart after adding item
      return response;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  // Remove item from cart
  async removeFromCart(productId: string) {
    try {
      await firstValueFrom(
        this.http.post(`${this.baseUrl}/remove`, Number(productId), {withCredentials: true})
      );
      await this.loadCart(); // Reload cart after removing item
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }

  // Get number of items in cart
  getCartCount(): number {
    return this.cartSubject.value.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Get cart total
  getTotal(): number {
    return this.cartSubject.value.total;
  }
}
