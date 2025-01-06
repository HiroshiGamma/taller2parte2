import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service.service';
import { AlertComponent } from '../../../Auth/Components/alert/alert.component';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';

@Component({
  selector: 'app-enable-disable-client',
  templateUrl: './enable-disable-client.component.html',
  styleUrls: ['./enable-disable-client.component.css'],
  imports: [AlertComponent, NavbarComponent]
})
export class EnableDisableClientComponent {
  alertMessage: string = '';

  constructor(private adminService: AdminService) {}

  /**
   * Habilita o deshabilita un usuario basado en su RUT.
   * @param rut - El RUT del usuario.
   * @param enable - Booleano que indica si se debe habilitar (true) o deshabilitar (false) al usuario.
   */
  async enableDisableUser(rut: string, enable: boolean) {
    try {
      const response = await this.adminService.enableDisableUser(rut, enable);
      console.log(response);
      this.alertMessage = `Usuario ${enable ? 'habilitado' : 'deshabilitado'} exitosamente.`;
    } catch (error) {
      this.alertMessage = `Error: RUT inválido o usuario no encontrado.`;
    }
  }
}
