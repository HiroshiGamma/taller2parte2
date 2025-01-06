import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private location: Location) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  /**
   * Maneja el envío del formulario para cambiar la contraseña.
   * Verifica que las nuevas contraseñas coincidan y llama al servicio de usuario para actualizar la contraseña.
   */
  async onSubmit() {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      if (newPassword !== confirmPassword) {
        this.message = 'Las nuevas contraseñas no coinciden.';
        return;
      }

      try {
        await this.userService.updatePassword({
          password: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        });
        this.message = 'Contraseña cambiada con éxito.';
      } catch (error) {
        const err = error as HttpErrorResponse;
        if (err.status === 400 && err.error && err.error.errors) {
          this.message = Object.values(err.error.errors).join(' ');
        } else {
          this.message = 'Error al cambiar la contraseña. Verifique su contraseña actual.';
        }
      }
    }
  }

  /**
   * Navega a la página anterior.
   */
  goBack() {
    this.location.back();
  }
}
