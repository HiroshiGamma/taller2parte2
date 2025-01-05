import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseAPIGetAllProducts } from '../../interfaces/ResponseAPIGetAllProducts';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../_Shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ImgDropComponent } from '../../../images/img-drop/img-drop.component';

@Component({
  selector: 'app-update-product-form',
  imports: [CommonModule, FormsModule, NavbarComponent, ImgDropComponent, ReactiveFormsModule],
  providers: [ProductService],
  templateUrl: './update-product-form.component.html',
  styleUrl: './update-product-form.component.css'
})
export class UpdateProductFormComponent {
  @ViewChild(ImgDropComponent) imgDrop!: ImgDropComponent;
  productForm!: FormGroup;
  selectedFile: File | null = null;
  productId: string = '';
  currentProduct: ResponseAPIGetAllProducts | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.initForm();
        this.loadProduct();
      }
    });
  }

  private initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    });
  }

  async loadProduct() {
    console.log(this.productId)
    try {
      const product = await this.productService.GetProduct(this.productId);
      this.currentProduct = product;
      
      // Fill the form with current values
      this.productForm.patchValue({
        name: product.name,
        type: product.type,
        price: product.price,
        stock: product.stock
      });
    } catch (error) {
      console.error('Error loading product:', error);
    }
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
  }

  async submit() {
    if (this.productForm.invalid) return;

    const formData = new FormData();

    formData.append('name', this.productForm.value.name);
    formData.append('type', this.productForm.value.type);
    formData.append('price', this.productForm.value.price);
    formData.append('stock', this.productForm.value.stock);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
    
    if (formData.get('name') == this.currentProduct?.name && formData.get('type') == this.currentProduct?.type) 
      {
        alert("Debe de cambiar o el nombre o el tipo del producto para actualizar");
        return;
      }

    try {
      console.log('Sending update with formData:', formData); // Debug log
      const response = await this.productService.UpdateProduct(this.productId, formData);
      console.log('Update response:', response);
      alert("Se ha actualizado con exito el producto");
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  volver() 
  {
    this.router.navigate(['/home']);
  }

}
