import { Component } from '@angular/core';
import { ChangePasswordComponent } from '../../Components/change-password/change-password.component';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';

@Component({
  selector: 'app-changepassword-page',
  imports: [ChangePasswordComponent, NavbarComponent],
  templateUrl: './changepassword-page.component.html',
  styleUrls: ['./changepassword-page.component.css']
})
export class ChangepasswordPageComponent {
  /**
   * Componente de la página de cambio de contraseña.
   * Este componente utiliza el componente ChangePasswordComponent para manejar el formulario de cambio de contraseña
   * y el componente NavbarComponent para mostrar la barra de navegación.
   */
}
