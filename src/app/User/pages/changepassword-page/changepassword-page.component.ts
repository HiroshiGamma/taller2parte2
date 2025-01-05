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

}
