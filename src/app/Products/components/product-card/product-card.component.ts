import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ResponseAPIGetAllProducts } from '../../interfaces/ResponseAPIGetAllProducts';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';

@Component({
  selector: 'product-card',
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: ResponseAPIGetAllProducts
  @Output() delete = new EventEmitter<string>();

  private LSservice = inject(LocalStorageService);
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
}
