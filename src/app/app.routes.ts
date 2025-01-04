import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../app/Products/pages/products-list/products-list.component').then(m => m.ProductsListComponent),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('../app/Auth/Pages/login-register/login-register.component').then(m => m.LoginRegisterComponent),
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
 }
]
