import { Component, Input } from '@angular/core';
import { ReceiptDto } from '../../interfaces/ReceiptDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receipt-card',
  imports: [CommonModule],
  templateUrl: './receipt-card.component.html',
  styleUrl: './receipt-card.component.css'
})
export class ReceiptCardComponent {
  @Input() receipt!: ReceiptDto;

  // Propiedad para alternar la visibilidad de los detalles del recibo
  toggleDetails = false;
}
