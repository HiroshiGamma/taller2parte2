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

  navigateToChangePassword() {
    this.router.navigate(['/changepassword']);
  }

  navigateToChangeProfile() {
    this.router.navigate(['/changeprofile']);
  }

  navigateToDeleteUser() {
    this.router.navigate(['/deleteuser']);
  }
}
