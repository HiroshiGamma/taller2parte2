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

  addProduct() {
    this.router.navigate(['add_product']);
  }

  toggleUsers() {
    this.router.navigate(['show-user']);
  }

  navigateToEnableDisable() {
    this.router.navigate(['enable-disable-client']);
  }
}
