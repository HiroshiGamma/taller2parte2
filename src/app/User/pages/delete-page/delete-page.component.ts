import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
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
export class DeletePageComponent {
  constructor(private userService: UserService) {}

  async confirmDelete() {
    const firstConfirmation = confirm('¿Está seguro de que desea eliminar su cuenta?');
    if (firstConfirmation) {
      const secondConfirmation = confirm('Esta acción es irreversible. ¿Está realmente seguro?');
      if (secondConfirmation) {
        try {
          await this.userService.deleteUser();
          alert('Cuenta eliminada con éxito.');
        } catch (errors: any) {
          alert('Error al eliminar la cuenta: ' + errors.join(', '));
        }
      }
    }
  }
}
