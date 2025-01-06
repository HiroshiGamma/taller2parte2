import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';

@Component({
  selector: 'app-user-menu',
  imports: [NavbarComponent],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {
  constructor(private router: Router) {}

  /**
   * Navega a la página de cambiar contraseña.
   */
  navigateToChangePassword() {
    this.router.navigate(['/changepassword']);
  }

  /**
   * Navega a la página de cambiar perfil.
   */
  navigateToChangeProfile() {
    this.router.navigate(['/changeprofile']);
  }

  /**
   * Navega a la página de eliminar cuenta de usuario.
   */
  navigateToDeleteUser() {
    this.router.navigate(['/deleteuser']);
  }
}
