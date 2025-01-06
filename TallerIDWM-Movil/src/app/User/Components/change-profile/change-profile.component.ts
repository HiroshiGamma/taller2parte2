import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.css'
})
export class ChangeProfileComponent {
  profileForm: FormGroup;
  genders = ['masculino', 'femenino', 'otro', 'prefiero no decirlo'];
  successMessage: string = '';
  updatedData: any = null;

  constructor(private fb: FormBuilder, private userService: UserService, private localStorageService: LocalStorageService, private location: Location) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  /**
   * Envía el formulario para actualizar el perfil del usuario.
   * Si el formulario es válido, intenta actualizar los datos del usuario
   * y guarda el nombre actualizado en el almacenamiento local.
   */
  async onSubmit() {
    if (this.profileForm.valid) {
      try {
        const response = await this.userService.updateUser(this.profileForm.value);
        this.successMessage = 'Datos actualizados correctamente';
        this.updatedData = this.profileForm.value;
        this.localStorageService.setVariable('username', this.profileForm.value.name);
        console.log('Usuario actualizado correctamente', response);
      } catch (error) {
        console.error('Error al actualizar el usuario', error);
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
