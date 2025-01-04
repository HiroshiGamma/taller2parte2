import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../../Components/login/login.component';
import { RegisterComponent } from '../../Components/register/register.component';
import { AuthServiceService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent, RegisterComponent, NavbarComponent],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  showRegisterForm = false;

  constructor(private authService: AuthServiceService, private router: Router) {}

  toggleRegisterForm() {
    this.showRegisterForm = !this.showRegisterForm;
  }

  async handleRegistration(formValue: any) {
    try {
      const response = await this.authService.register(formValue);
      if (response.token) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  }
}
