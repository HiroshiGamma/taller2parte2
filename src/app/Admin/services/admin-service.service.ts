import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPIUser } from '../Interface/ResponseApiUserList';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiUrl = 'http://localhost:5042/api/Account/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ResponseAPIUser> {
    return this.http.get<ResponseAPIUser>(this.apiUrl);
  }
}
