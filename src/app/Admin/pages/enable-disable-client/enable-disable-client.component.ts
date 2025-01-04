import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { AlertComponent } from '../../../Auth/Components/alert/alert.component';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';

@Component({
  selector: 'app-enable-disable-client',
  templateUrl: './enable-disable-client.component.html',
  styleUrl: './enable-disable-client.component.css',
  imports: [AlertComponent, NavbarComponent]
})
export class EnableDisableClientComponent {
  alertMessage: string = '';

  constructor(private adminService: AdminServiceService) {}

  enableDisableUser(rut: string, enable: boolean) {
    this.adminService.enableDisableUser(rut, enable).subscribe(response => {
      console.log(response);
      this.alertMessage = `User ${enable ? 'enabled' : 'disabled'} successfully.`;
    }, error => {
      this.alertMessage = `Error: Invalid RUT or user not found.`;
    });
  }
}
