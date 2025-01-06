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

  /**
   * Carga el carrito desde el backend
   */
  async loadCart() {
    try {
      console.log('Cargando carrito...');
      const response = await firstValueFrom(
        this.http.get<CartDto>(this.baseUrl, {withCredentials: true})
      );
      console.log('Carrito cargado:', response);
      this.cartSubject.next(response);
    } catch (error) {
      console.error('Error cargando el carrito:', error);
    }
  }

  /**
   * Obtiene el carrito como observable
   */
  getCart() {
    return this.cartSubject.asObservable();
  }

  /**
   * Añade un producto al carrito
   * @param productId - ID del producto a añadir
   */
  async addToCart(productId: string) {
    try {
      console.log('Añadiendo producto al carrito:', Number(productId));
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}/add`, Number(productId), {withCredentials: true})
      );
      console.log('Respuesta al añadir al carrito:', response);
      await this.loadCart(); // Recargar carrito después de añadir el producto
      return response;
    } catch (error) {
      console.error('Error añadiendo el producto al carrito:', error);
      throw error;
    }
  }

  /**
   * Elimina un producto del carrito
   * @param productId - ID del producto a eliminar
   */
  async removeFromCart(productId: string) {
    try {
      await firstValueFrom(
        this.http.post(`${this.baseUrl}/remove`, Number(productId), {withCredentials: true})
      );
      await this.loadCart(); // Recargar carrito después de eliminar el producto
    } catch (error) {
      console.error('Error eliminando el producto del carrito:', error);
      await this.loadCart();
      throw error;
    }
  }

  /**
   * Realiza el checkout del carrito
   * @param formData - Datos del formulario de checkout
   */
  async CheckOut(formData: FormData): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}/checkout`, formData)
      );
      return response;
    } catch (error) {
      console.error('Error realizando el checkout:', error);
      throw error;
    }
  }

  /**
   * Obtiene el número de productos en el carrito
   */
  getCartCount(): number {
    return this.cartSubject.value.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Obtiene el total del carrito
   */
  getTotal(): number {
    return this.cartSubject.value.total;
  }
}
