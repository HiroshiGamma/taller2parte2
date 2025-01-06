import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router : Router,
    private localService : LocalStorageService) {}

  /**
   * Verifica si el usuario puede activar la ruta.
   * @param route Información sobre la ruta activada.
   * @param state Estado del router en el momento de la activación.
   * @returns booleano indicando si el usuario puede activar la ruta.
   */
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
    
    // Envia a la pagina not found si no esta autorizado para acceder a la ruta
    this.router.navigate(['/not_found']);
    return false;
  }
}