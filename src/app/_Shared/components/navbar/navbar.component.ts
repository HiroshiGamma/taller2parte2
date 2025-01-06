import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private LSservice = inject(LocalStorageService);
  isLogged: boolean = this.LSservice.getVariable('token') ? true : false;
  role: string = this.LSservice.getVariable('role');
  username: string = '';
  isDropdownOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.isLogged) {
      this.username = this.LSservice.getVariable('username');
      console.log('Username:', this.username); // Log the username to the console
    }
  }

  /**
   * Alterna el estado del menú desplegable.
   */
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Cierra la sesión del usuario y redirige a la página de inicio de sesión.
   */
  logout() {
    this.LSservice.clearAll();
    this.router.navigate(['login']);
  }

  /**
   * Actualiza el nombre de usuario desde el servicio de almacenamiento local.
   */
  updateUsername() {
    this.username = this.LSservice.getVariable('username');
  }
}
