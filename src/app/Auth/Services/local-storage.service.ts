import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setVariable(key: string, value: any ){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getVariable(key: string)
  {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeVariable(key: string){
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}
