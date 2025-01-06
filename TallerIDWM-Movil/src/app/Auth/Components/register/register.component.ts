import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  registrationAlert: boolean = false;
  error: boolean = false;
  errorMessage: string = '';

  private authService = inject(AuthServiceService);
  private localStorage = inject(LocalStorageService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  /**
   * Crea el formulario de registro con validaciones.
   */
  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255), Validators.pattern('^[a-zA-Z\\s]+$')]],
      rut: ['', [Validators.required, Validators.maxLength(10)]],
      birthdate: ['', [Validators.required, this.validateBirthdate]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required, Validators.pattern('masculino|femenino|otro|prefiero no decirlo')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  /**
   * Valida la fecha de nacimiento.
   * @param control Control del formulario que contiene la fecha de nacimiento.
   * @returns null si la fecha es válida, de lo contrario un objeto con el error.
   */
  validateBirthdate(control: any) {
    const birthdate = control.value;
    const [day, month, year] = birthdate.split('-').map((val: string) => parseInt(val, 10));
    const date = new Date(year, month - 1, day);
    return date < new Date() ? null : { invalidDate: true };
  }

  /**
   * Registra un nuevo usuario.
   */
  async register() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
      this.registrationAlert = true;
      return;
    }

    const formValue = { ...this.form.value };
    const [day, month, year] = formValue.birthdate.split('-').map((val: string) => parseInt(val, 10));
    formValue.birthdate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`; // Ensure birthdate is in dd-mm-yyyy format
    formValue.enabled = true; // Ensure enabled is always true

    try {
      const response = await this.authService.register(formValue);
      if (response.token) {
        this.localStorage.setVariable('token', response.token);
        this.localStorage.setVariable('username', response.username); // Save username
        this.localStorage.setVariable('role', response.role); // Save role
        this.router.navigate(['/user_menu']);
      } else {
        this.errorMessage = 'Registro fallido.';
        this.registrationAlert = true;
      }
    } catch (error: any) {
      this.errorMessage = 'Error en el registro.';
      this.registrationAlert = true;
    }
  }

  /**
   * Cierra la alerta de error.
   */
  closeAlert() {
    this.errorMessage = '';
    this.registrationAlert = false;
  }
}
