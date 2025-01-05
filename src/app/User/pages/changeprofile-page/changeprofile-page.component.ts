import { Component } from '@angular/core';
import { ChangeProfileComponent } from '../../Components/change-profile/change-profile.component';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';

@Component({
  selector: 'app-changeprofile-page',
  imports: [ChangeProfileComponent, NavbarComponent],
  templateUrl: './changeprofile-page.component.html',
  styleUrls: ['./changeprofile-page.component.css']
})
export class ChangeprofilePageComponent {}
