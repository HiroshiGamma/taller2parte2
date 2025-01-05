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

  async deleteUser(): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.delete<any>(this.apiUrl + 'delete-user'));
      this.localStorageService.clearAll(); // Clear all user data
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de eliminación de usuario', error);

      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error Desconocido');

      return Promise.reject(this.errors);
    }
  }
}
