import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin-service.service';
import { UsersCardsComponent } from '../../Components/users-cards/users-cards.component';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [CommonModule, UsersCardsComponent, NavbarComponent, FormsModule, IonButton],
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  users: any[] = [];
  showUsers: boolean = false;
  filterName: string = '';

  constructor(private adminService: AdminService) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene la lista de usuarios desde el servicio de administración.
   */
  async ngOnInit() {
    try {
      const data = await this.adminService.getUsers();
      this.users = data.users;
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    }
  }

  /**
   * Método para filtrar usuarios por nombre.
   * Obtiene la lista de usuarios filtrados desde el servicio de administración.
   */
  async filterUsersByName() {
    try {
      const data = await this.adminService.getUsersByName(this.filterName);
      this.users = data.users;
    } catch (error) {
      console.error('Error al obtener los usuarios por nombre', error);
    }
  }
}
