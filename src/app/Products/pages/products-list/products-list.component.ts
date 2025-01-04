import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ResponseAPIGetAllProducts } from '../../interfaces/ResponseAPIGetAllProducts';
import { QueryObjectProduct } from '../../interfaces/QueryObjectProduct';
import { provideRouter } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-list',
  imports: [ProductCardComponent, CommonModule, FormsModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{
  productsArray: ResponseAPIGetAllProducts[] = [];
  filteredArray: ResponseAPIGetAllProducts[] = [];
  searchQuery: string = '';

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

        console.log('Productos obtenidos:', this.productsArray);
      })
      .catch((error) => {
        console.log('Error al obtener productos:', error);
      });
    this.filteredArray = this.productsArray;
    return;
  }

  filterProducts() : void 
  {
    const query  = this.searchQuery.toLowerCase();
    this.filteredArray = this.productsArray.filter((product) =>
      Object.values(product)
      .join(' ')
      .toLowerCase()
      .includes(query)
    );
  }


}
