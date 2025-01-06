import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ResponseAPIUser } from '../Interface/ResponseApiUserList';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:5042/api/Account';
  public errors: string[] = [];
  private http = inject(HttpClient);

  /**
   * Obtiene la lista de usuarios.
   * @returns {Promise<ResponseAPIUser>} Promesa que resuelve con la lista de usuarios.
   */
  async getUsers(): Promise<ResponseAPIUser> {
    const url = `${this.apiUrl}/users`;
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIUser>(url));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de obtener usuarios', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }

  /**
   * Obtiene la lista de usuarios filtrados por nombre.
   * @param {string} name - Nombre del usuario.
   * @returns {Promise<ResponseAPIUser>} Promesa que resuelve con la lista de usuarios filtrados.
   */
  async getUsersByName(name: string): Promise<ResponseAPIUser> {
    const url = `${this.apiUrl}/users?name=${name}`;
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIUser>(url));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de obtener usuarios por nombre', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }

  /**
   * Habilita o deshabilita un usuario.
   * @param {string} rut - RUT del usuario.
   * @param {boolean} enable - Indica si se debe habilitar (true) o deshabilitar (false) el usuario.
   * @returns {Promise<any>} Promesa que resuelve con la respuesta del servidor.
   */
  async enableDisableUser(rut: string, enable: boolean): Promise<any> {
    const url = `${this.apiUrl}/enable-disable/${rut}`;
    const body = enable.toString();
    try {
      const response = await firstValueFrom(this.http.put<any>(url, body, {
        headers: { 'Content-Type': 'application/json' }
      }));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de habilitar/deshabilitar usuario', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }
}
