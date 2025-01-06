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

  /**
   * Abre el modal de confirmación.
   */
  openModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  /**
   * Cierra el modal de confirmación.
   */
  closeModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  /**
   * Confirma la eliminación de la cuenta del usuario.
   * Intenta eliminar la cuenta del usuario a través del servicio UserService.
   * Si la eliminación es exitosa, redirige al usuario a la página de inicio de sesión.
   * Si ocurre un error, muestra una alerta con el mensaje de error.
   */
  async confirmDelete() {
    try {
      await this.userService.deleteUser();
      alert('Cuenta eliminada con éxito.');
      this.router.navigate(['/login']);
    } catch (errors: any) {
      alert('Error al eliminar la cuenta: ' + errors.join(', '));
    } finally {
      this.closeModal();
    }
  }

  /**
   * Cancela la operación de eliminación y redirige al usuario al menú de usuario.
   */
  cancel() {
    this.closeModal();
    this.router.navigate(['/user_menu']);
  }
}
