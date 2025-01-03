import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseAPIUser } from '../Interface/ResponseApiUser';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

    private apiUrl = 'http://localhost:5042/api/';
    public errors: string [] = [];
    private http = inject(HttpClient);
    private router = inject(Router);
    private localStorageService = inject(LocalStorageService);
  
    async login(form: any): Promise<ResponseAPIUser>{
  
      try{
        const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'auth/login', form));
        this.localStorageService.setAuthToken(response.token); 
        this.router.navigate(['/home']); 
        return Promise.resolve(response);
      }catch(error){
        console.log('Error en el servicio de login', error);

        let e = error as HttpErrorResponse;
        this.errors.push(e.message || 'Error Desconocido');

        return Promise.reject(this.errors);
      }
    }

    async register(form: any): Promise<ResponseAPIUser> {
      try {
        const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'auth/register', form));
        this.localStorageService.setAuthToken(response.token);
        return Promise.resolve(response);
      } catch (error) {
        console.log('Error en el servicio de registro', error);

        let e = error as HttpErrorResponse;
        this.errors.push(e.message || 'Error Desconocido');

        return Promise.reject(this.errors);
      }
    }

    logout() {
        this.localStorageService.clearAll(); 
        this.router.navigate(['/']);
    }
}
