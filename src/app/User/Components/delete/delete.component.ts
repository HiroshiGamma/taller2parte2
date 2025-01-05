import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  constructor(private userService: UserService, private router: Router) {}

  async confirmDelete() {
    const firstConfirmation = confirm('¿Está seguro de que desea eliminar su cuenta?');
    if (firstConfirmation) {
      const secondConfirmation = confirm('Esta acción es irreversible. ¿Está realmente seguro?');
      if (secondConfirmation) {
        try {
          await this.userService.deleteUser();
          alert('Cuenta eliminada con éxito.');
          this.router.navigate(['/login']);
        } catch (errors: any) {
          alert('Error al eliminar la cuenta: ' + errors.join(', '));
        }
      }
    }
  }

  cancel() {
    this.router.navigate(['/user_menu']);
  }
}
