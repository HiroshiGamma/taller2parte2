import { CommonModule } from '@angular/common';
import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../../Services/auth-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, AlertComponent],
  providers: [AuthServiceService, LocalStorageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form!: FormGroup;
  registerAlert: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  @Output() registerSuccess = new EventEmitter<any>();

  private AuthService = inject(AuthServiceService);
  private localStorage = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario();
  }

  formulario() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{1,2}\d{3}\d{3}-[\dkK]$/)]],
      birthdate: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  get usernameValidate() {
    return this.form.get('username')?.invalid && this.form.get('username')?.touched;
  }

  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get rutValidate() {
    return this.form.get('rut')?.invalid && this.form.get('rut')?.touched;
  }

  get birthdateValidate() {
    return this.form.get('birthdate')?.invalid && this.form.get('birthdate')?.touched;
  }

  get genderValidate() {
    return this.form.get('gender')?.invalid && this.form.get('gender')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }

  get confirmPasswordValidate() {
    return this.form.get('confirmPassword')?.invalid && this.form.get('confirmPassword')?.touched;
  }

  async register() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Please fill out the form correctly.';
      this.registerAlert = true;
      return;
    }

    try {
      const formValue = {
        username: this.form.value.username,
        rut: this.form.value.rut,
        birthdate: this.form.value.birthdate,
        email: this.form.value.email,
        gender: this.form.value.gender,
        password: this.form.value.password,
        enabled: true
      }; // Format the form data

      const response = await this.AuthService.register(formValue);

      if (response.token) {
        console.log('Registration Successful', response.username);
        this.localStorage.setAuthToken(response.token); // Save the token
        this.registerSuccess.emit(formValue);
        this.router.navigate(['/home']); // Redirect to home
      } else {
        this.errorMessage = 'Registration failed.';
        this.registerAlert = true;
      }

    } catch (error: any) {
      this.errorMessage = 'Registration error.';
      this.registerAlert = true;
    }
  }

  // Method to close the alert
  closeAlert() {
    this.errorMessage = '';
    this.registerAlert = false;
  }

}
