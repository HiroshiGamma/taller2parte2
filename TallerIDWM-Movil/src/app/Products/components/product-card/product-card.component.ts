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

  /**
   * Emitir evento para eliminar el producto
   */
  onDelete() {
    this.delete.emit(this.product.id);
  }

  /**
   * Añadir el producto al carrito
   */
  async addToCart() {
    try {
      console.log('Añadiendo producto al carrito:', this.product);
      await this.cartService.addToCart(this.product.id);
      console.log('Producto añadido exitosamente');
    } catch (error) {
      console.error('Error en el componente al añadir al carrito:', error);
    }
  }

  /**
   * Emitir evento para editar el producto
   */
  onEdit() {
    this.edit.emit(this.product.id);
  }
}
