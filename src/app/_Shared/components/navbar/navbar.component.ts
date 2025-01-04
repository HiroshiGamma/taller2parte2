import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  private LSservice = inject(LocalStorageService);
  isLogged: boolean = this.LSservice.getVariable('token') ? true : false;


  constructor (private router: Router) {}
  logout() {
   this.LSservice.clearAll();
   this.router.navigate(['login']);
  }

}
