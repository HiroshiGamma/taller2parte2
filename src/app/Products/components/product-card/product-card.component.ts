import { Component, Input } from '@angular/core';
import { ResponseAPIGetAllProducts } from '../../interfaces/ResponseAPIGetAllProducts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: ResponseAPIGetAllProducts

  constructor() {
    this.product = {
      id: 0,
      name:     '',
      type:     '',
      price:    0,
      stock:    0,
      imageUrl: ''
    }
  }

}
