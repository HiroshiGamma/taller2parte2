import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../Services/auth-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';
import { ResponseAPIUser } from '../../Interface/ResponseApiUser';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, AlertComponent],
  providers: [AuthServiceService, LocalStorageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  loginAlert: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  private AuthService = inject(AuthServiceService);
  private localStorage = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  async login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Please fill out the form correctly.';
      this.loginAlert = true;
      return;
    }

    try {
      const response = await this.AuthService.login(this.form.value);

      if (response.token) {
        this.localStorage.setVariable('token', response.token);
        this.localStorage.setVariable('user', response.username);
        console.log('Login Successful', response.username);
      } else {
        this.errorMessage = 'Invalid password.';
        this.loginAlert = true;
      }

    } catch (error: any) {
      this.errorMessage = 'Invalid email or password.';
      this.loginAlert = true;
    }
  }

  // Method to close the alert
  closeAlert() {
    this.errorMessage = '';
    this.loginAlert = false;
  }

}
