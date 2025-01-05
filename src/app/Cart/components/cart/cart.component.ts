import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/CartItem';
import { CartDto } from '../../interfaces/CartDto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [CartService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  
  cart$: Observable<CartDto>;

  constructor(private cartService: CartService) 
  {
    this.cart$ = this.cartService.getCart();
  }
  
  ngOnInit() {
    this.cartService.loadCart();
  }

  async addToCart(productId: string) {
    try {
      await this.cartService.addToCart(productId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  async removeFromCart(productId: string) {
    try {
      await this.cartService.removeFromCart(productId);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }
}
