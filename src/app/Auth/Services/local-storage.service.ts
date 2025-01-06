import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Guarda una variable en el localStorage.
   * @param key La clave de la variable.
   * @param value El valor de la variable.
   */
  setVariable(key: string, value: any ){
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Obtiene una variable del localStorage.
   * @param key La clave de la variable.
   * @returns El valor de la variable o null si no existe.
   */
  getVariable(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Elimina una variable del localStorage.
   * @param key La clave de la variable.
   */
  removeVariable(key: string){
    localStorage.removeItem(key);
  }

  /**
   * Limpia todas las variables del localStorage.
   */
  clearAll() {
    localStorage.clear();
  }
}
