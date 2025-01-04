import { Routes } from '@angular/router';
import { AdminGuard } from './Auth/guards/admin.guard';
import { normalUserGuard } from './Auth/guards/normal-user.guard';

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
    path: 'not_found',
    loadComponent: () => import('../app/NotFound/Page/error404/error404.component').then(m => m.Error404Component),
    pathMatch: 'full'
  },
  {
    path: 'admin_menu',
    loadComponent: () => import('../app/Admin/pages/admin-menu/admin-menu.component').then(m => m.AdminMenuComponent),
    canActivate: [AdminGuard],
            children: [             
             {
                path: '',
                redirectTo: 'admin_menu',
                pathMatch: 'full'
             },
             {
                path: '**',
                redirectTo: 'admin_menu',
             }
            ]
  },
  {
    path: 'user_menu',
    loadComponent: () => import('../app/User/pages/user-menu/user-menu.component').then(m => m.UserMenuComponent),
    canActivate: [normalUserGuard],
            children: [             
             {
                path: '',
                redirectTo: 'user_menu',
                pathMatch: 'full'
             },
             {
                path: '**',
                redirectTo: 'user_menu',
             }
            ]
  },
  {
    path: '**',
    redirectTo: 'not_found',
  }
]
