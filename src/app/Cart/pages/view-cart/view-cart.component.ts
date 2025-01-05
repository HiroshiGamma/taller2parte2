import { Component } from '@angular/core';
import { CartComponent } from '../../components/cart/cart.component';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";

@Component({
  selector: 'app-view-cart',
  imports: [NavbarComponent, CartComponent],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent {

}
