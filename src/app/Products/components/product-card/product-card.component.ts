import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ResponseAPIGetAllProducts } from '../../interfaces/ResponseAPIGetAllProducts';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';
import { CartService } from '../../../Cart/services/cart.service';

@Component({
  selector: 'product-card',
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: any;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  private LSservice = inject(LocalStorageService);
  private cartService = inject(CartService)
  role: string = this.LSservice.getVariable('role');

  constructor() {
    this.product = {
      id: '',
      name:     '',
      type:     '',
      price:    0,
      stock:    0,
      imageUrl: ''
    }
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }

  async addToCart() {
    try {
      console.log('Adding product to cart:', this.product);
      await this.cartService.addToCart(this.product.id);
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error in component when adding to cart:', error);
    }
  }

  onEdit() {
    this.edit.emit(this.product.id);
  }
}
