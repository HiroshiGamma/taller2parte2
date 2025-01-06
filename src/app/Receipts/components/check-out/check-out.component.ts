import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutDto } from '../../interfaces/CheckOutDto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../Cart/services/cart.service';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";

@Component({
  selector: 'app-check-out',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NavbarComponent],
  providers: [CartService],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit{
  checkoutForm: FormGroup;
  isLoading = false;
  error = '';
  success = false;
  cartService = inject(CartService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient, 
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      userRut: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      commune: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Maneja el envío del formulario para el proceso de compra.
   * Valida el formulario, envía los datos al servidor y maneja la respuesta.
   */
  async onSubmit() {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      this.error = '';
      this.success = false;

      try {
        const formData = new FormData();
        // Añadir todos los campos del formulario a FormData
        formData.append('rut', this.checkoutForm.value.userRut);
        formData.append('country', this.checkoutForm.value.country);
        formData.append('city', this.checkoutForm.value.city);
        formData.append('commune', this.checkoutForm.value.commune);
        formData.append('street', this.checkoutForm.value.street);
        
        const response = await this.cartService.CheckOut(formData);
        console.log('Update response:', response);
        alert("Se ha procesado la transacción");
        this.router.navigate(['/home']);
        this.checkoutForm.reset();
      } catch (err: any) {
        this.error = err.message || 'La compra ha fallado. Por favor, inténtelo de nuevo.';
      } finally {
        this.isLoading = false;
      }
    } else {
      this.error = 'Por favor, complete todos los campos requeridos.';
    }
  }
}
