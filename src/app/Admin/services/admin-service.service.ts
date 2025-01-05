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

  async getUsers(): Promise<ResponseAPIUser> {
    const url = `${this.apiUrl}/users`;
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIUser>(url));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error in the get users service', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Unknown Error');
      return Promise.reject(this.errors);
    }
  }

  async getUsersByName(name: string): Promise<ResponseAPIUser> {
    const url = `${this.apiUrl}/users?name=${name}`;
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIUser>(url));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error in the get users by name service', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Unknown Error');
      return Promise.reject(this.errors);
    }
  }

  async enableDisableUser(rut: string, enable: boolean): Promise<any> {
    const url = `${this.apiUrl}/enable-disable/${rut}`;
    const body = enable.toString();
    try {
      const response = await firstValueFrom(this.http.put<any>(url, body, {
        headers: { 'Content-Type': 'application/json' }
      }));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error in the enable/disable user service', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Unknown Error');
      return Promise.reject(this.errors);
    }
  }
}
