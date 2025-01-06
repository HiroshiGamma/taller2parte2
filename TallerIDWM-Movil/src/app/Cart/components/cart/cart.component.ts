import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/CartItem';
import { CartDto } from '../../interfaces/CartDto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  
  cart$: Observable<CartDto>;

  constructor(private cartService: CartService, private router: Router) 
  {
    this.cart$ = this.cartService.getCart();
  }
  
  ngOnInit() {
    this.cartService.loadCart();
  }

  /**
   * Añade un producto al carrito.
   * @param productId El ID del producto a añadir.
   */
  async addToCart(productId: string) {
    try {
      await this.cartService.addToCart(productId);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
    }
  }

  /**
   * Elimina un producto del carrito.
   * @param productId El ID del producto a eliminar.
   */
  async removeFromCart(productId: string) {
    try {
      await this.cartService.removeFromCart(productId);
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  }

  /**
   * Navega a la página de pago.
   */
  checkOut() 
  {
    this.router.navigate(['checkout'])
  }
}
