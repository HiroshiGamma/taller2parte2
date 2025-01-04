import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router : Router,
    private localService : LocalStorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.localService.getVariable('token')) {
      if(this.localService.getVariable('user'))
        {
          if(this.localService.getVariable('role') == 'Admin') {
            return true;
          }
        }
    }
    
    // Redirect to home page or unauthorized page if user is not admin
    this.router.navigate(['/not_found']);
    return false;
  }
}