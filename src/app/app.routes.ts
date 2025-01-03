import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginRegisterComponent } from './Pages/login-register/login-register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginRegisterComponent }, // Default route
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
];
