import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";
import { ProductDto } from '../../interfaces/ProductDto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImgDropComponent } from '../../../images/img-drop/img-drop.component';
import { LocalStorageService } from '../../../Auth/Services/local-storage.service';

@Component({
  selector: 'app-add-product-form',
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, ImgDropComponent],
  providers: [LocalStorageService],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css'
})
export class AddProductproductFormComponent implements OnInit{
  @ViewChild(ImgDropComponent) imgDrop!: ImgDropComponent;
  productForm!: FormGroup;
  error: boolean = false;
  errorMessage: string[] = [];
  selectedFile: File | null = null;
  productService = inject(ProductService);
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
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

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  async submit() {
    if (this.productForm.invalid || !this.selectedFile) return;

    try {
      const formData = new FormData();
      // Add all form fields to FormData
      formData.append('name', this.productForm.value.name);
      formData.append('type', this.productForm.value.type);
      formData.append('price', this.productForm.value.price);
      formData.append('stock', this.productForm.value.stock);
      formData.append('image', this.selectedFile); // Add the file

      const response = await this.productService.CreateProduct(formData);

      if (response) {
        this.error = false;
        this.errorMessage = [];
        console.log('Producto registrado: ', response);
        this.productForm.reset();
      } else {
        this.error = true;
        this.errorMessage = this.productService.getErrors();
      }
    } catch (error: any) {
      console.error('Error en OnSubmit', error);
      this.error = true;
      this.errorMessage.push(error.error);
    }
  }
}
