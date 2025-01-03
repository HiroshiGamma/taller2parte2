import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthServiceService) {}

  logout() {
    this.authService.logout();
  }
}
