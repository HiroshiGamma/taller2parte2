import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin-service.service';
import { UsersCardsComponent } from '../../Components/users-cards/users-cards.component';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [CommonModule, UsersCardsComponent, NavbarComponent, FormsModule],
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  users: any[] = [];
  showUsers: boolean = false;
  filterName: string = '';

  constructor(private adminService: AdminService) {}

  async ngOnInit() {
    try {
      const data = await this.adminService.getUsers();
      this.users = data.users;
    } catch (error) {
      console.error('Error fetching users', error);
    }
  }

  async filterUsersByName() {
    try {
      const data = await this.adminService.getUsersByName(this.filterName);
      this.users = data.users;
    } catch (error) {
      console.error('Error fetching users by name', error);
    }
  }
}
