import { Component } from '@angular/core';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-menu',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {
  displayUsers: boolean = false;

  constructor(private router: Router) {}

  /**
   * Navega a la página para agregar un nuevo producto.
   */
  addProduct() {
    this.router.navigate(['add_product']);
  }

  /**
   * Navega a la página para mostrar los usuarios.
   */
  toggleUsers() {
    this.router.navigate(['show-user']);
  }

  /**
   * Navega a la página para habilitar o deshabilitar un cliente.
   */
  navigateToEnableDisable() {
    this.router.navigate(['enable-disable-client']);
  }

  /**
   * Navega a la página para ver la lista de recibos.
   */
  navigateToReceiptsList() {
    this.router.navigate(['receipts']);
  }
}
