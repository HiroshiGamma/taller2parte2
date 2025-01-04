import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPIUser } from '../Interface/ResponseApiUserList';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiUrl = 'http://localhost:5042/api/Account';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ResponseAPIUser> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<ResponseAPIUser>(url);
  }

  getUsersByName(name: string): Observable<ResponseAPIUser> {
    const url = `${this.apiUrl}/users?name=${name}`;
    return this.http.get<ResponseAPIUser>(url);
  }

  enableDisableUser(rut: string, enable: boolean): Observable<any> {
    const url = `${this.apiUrl}/enable-disable/${rut}`;
    const body = enable.toString();
    return this.http.put<any>(url, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

}
