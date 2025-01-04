import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";
import { ProductDto } from '../../interfaces/ProductDto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product-form',
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css'
})
export class AddProductproductFormComponent implements OnInit{
  productForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  productService = inject(ProductService);
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required, Validators.email]],
      price: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      imageUrl: ['', Validators.required],
    });
  }
  get nameValidate() 
  {
    return this.productForm.get('name')?.invalid && this.productForm.get('name')?.touched;
  }
  get typeValidate() 
  {
    return this.productForm.get('type')?.invalid && this.productForm.get('type')?.touched;
  }
  get priceValidate() 
  {
    return this.productForm.get('price')?.invalid && this.productForm.get('price')?.touched;
  }
  get stockValidate() 
  {
    return this.productForm.get('stock')?.invalid && this.productForm.get('stock')?.touched;
  }
  get imageValidate() 
  {
    return this.productForm.get('image')?.invalid && this.productForm.get('image')?.touched;
  }
  async onSubmit() {
    if (this.productForm.invalid) return;
    try{
      const Product: ProductDto = {
        name: this.productForm.value.name,
        type: this.productForm.value.type,
        price: this.productForm.value.price,
        stock: this.productForm.value.stock,
        imageUrl: this.productForm.value.imageUrl,
      }
      const response = await this.productService.CreateProduct(Product);

      console.log('Response: ', response);
      if (response) {
        this.error = false;
        this.errorMessage = [];
        console.log('Profesor registrado: ', response);
      }

      else {
        this.error = true;
        this.errorMessage = this.productService.getErrors();
        console.log('Error al crear profesor: ', this.errorMessage);
      }
    } catch (error:any) {
      
      console.error('Error en OnSubmit', error);
      this.error = true;
      this.errorMessage.push(error.error);
    } finally {
      console.log('Petición finalizada.');
    }
    }
}
