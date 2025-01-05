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

    private apiUrl = 'http://localhost:5042/api/Auth/';
    public errors: string [] = [];
    private http = inject(HttpClient);
    private router = inject(Router);
    public localStorageService = inject(LocalStorageService);
  
    async login(form: any): Promise<ResponseAPIUser>{
  
      try{
        const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'login', form));
        this.localStorageService.setVariable('token', response.token); 
        this.localStorageService.setVariable('username', response.username); // Ensure the key is 'username'
        this.localStorageService.setVariable('role', response.role);
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
        form.enabled = true;
        const [day, month, year] = form.birthdate.split('-').map((val: string) => parseInt(val, 10));
        form.birthdate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`; // Ensure birthdate is in dd-mm-yyyy format

        const response = await firstValueFrom(this.http.post<ResponseAPIUser>(this.apiUrl + 'register', form));
        this.localStorageService.setVariable('token', response.token);
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
