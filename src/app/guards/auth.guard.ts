import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private localStorageService: LocalStorageService) {}

  canActivate(): boolean {
    const token = this.localStorageService.getAuthToken();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
