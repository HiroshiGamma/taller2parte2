import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from '../../Auth/Services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5042/api/Account/';
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  public errors: string[] = [];

  constructor() { }

  /**
   * Actualiza la información del usuario.
   * @param form - Datos del formulario de actualización del usuario.
   * @returns Una promesa que se resuelve con la respuesta del servidor o se rechaza con un error.
   */
  async updateUser(form: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.put<any>(this.apiUrl + 'update-user', form));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de actualización de usuario', error);

      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error Desconocido');

      return Promise.reject(this.errors);
    }
  }

  /**
   * Actualiza la contraseña del usuario.
   * @param form - Datos del formulario de actualización de la contraseña.
   * @returns Una promesa que se resuelve con la respuesta del servidor o se rechaza con un error.
   */
  async updatePassword(form: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.put<any>(this.apiUrl + 'update-password', form));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de actualización de contraseña', error);

      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error Desconocido');

      return Promise.reject(this.errors);
    }
  }

  /**
   * Elimina la cuenta del usuario.
   * @returns Una promesa que se resuelve con la respuesta del servidor o se rechaza con un error.
   */
  async deleteUser(): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.delete<any>(this.apiUrl + 'delete-user'));
      this.localStorageService.clearAll(); // Limpiar todos los datos del usuario
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de eliminación de usuario', error);

      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error Desconocido');

      return Promise.reject(this.errors);
    }
  }
}
