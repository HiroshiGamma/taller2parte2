import { Component } from '@angular/core';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteComponent } from '../../Components/delete/delete.component';

@Component({
  selector: 'app-delete-page',
  imports: [CommonModule, FormsModule, NavbarComponent, DeleteComponent],
  templateUrl: './delete-page.component.html',
  styleUrl: './delete-page.component.css'
})
export class DeletePageComponent {}
