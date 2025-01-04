import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ResponseAPIGetAllProducts } from '../../interfaces/ResponseAPIGetAllProducts';
import { QueryObjectProduct } from '../../interfaces/QueryObjectProduct';
import { provideRouter } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";

@Component({
  selector: 'products-list',
  imports: [ProductCardComponent, CommonModule, FormsModule, HttpClientModule, NavbarComponent],
  providers: [ProductService],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{
  productsArray: ResponseAPIGetAllProducts[] = [];
  filteredArray: ResponseAPIGetAllProducts[] = [];
  currentPage: number = 1; // Página actual
  pageSize: number = 10; // Cantidad máxima por página
  totalPages: number = 1; // Total de páginas
  searchQuery: string = '';
  searchType: string = '';
  isSortAscending: boolean = true;


  private productService = inject(ProductService);


  ngOnInit(): void 
  {
    this.ObtenerProductos();
  }

  ObtenerProductos() 
  {
    console.log('Obteniendo productos...');
    this.productService
      .GetAllProducts()
      .then((products) => {
        for (let i = 0; i < products.length; i++) {
          console.log('Añadiendo:', products[i]);
          this.productsArray.push(products[i]);
        }
        this.totalPages = Math.ceil(this.productsArray.length / this.pageSize);

        this.paginate();

        console.log('Productos obtenidos:', this.productsArray);
      })
      .catch((error) => {
        console.log('Error al obtener productos:', error);
      });
    this.filteredArray = this.productsArray;
    return;
  }

  filterProductsByName() : void 
  {
    const query  = this.searchQuery.toLowerCase();
    this.filteredArray = this.productsArray.filter((product) =>
      product.name
      .toLowerCase()
      .includes(query)
    );
  }
  filterProductsByType() : void 
  {
    if (!this.searchType) {
      this.filteredArray = this.productsArray; // Show all products if no type selected
      return;
    }
    
    this.filteredArray = this.productsArray.filter((product) =>
      product.type.toLowerCase() === this.searchType.toLowerCase()
    );
  }

  sortByPrice(): void {
    this.isSortAscending = !this.isSortAscending; // Toggle sort direction
    
    this.filteredArray.sort((a, b) => {
      if (this.isSortAscending) {
        return a.price - b.price; // Ascending order
      } else {
        return b.price - a.price; // Descending order
      }
    });
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredArray = this.productsArray.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }
}
