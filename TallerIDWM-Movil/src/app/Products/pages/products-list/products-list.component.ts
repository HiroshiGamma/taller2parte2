import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ResponseAPIGetAllProducts } from '../../interfaces/ResponseAPIGetAllProducts';
import { QueryObjectProduct } from '../../interfaces/QueryObjectProduct';
import { provideRouter, Router } from '@angular/router';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../../_Shared/components/navbar/navbar.component";

@Component({
  selector: 'products-list',
  imports: [ProductCardComponent, CommonModule, FormsModule, NavbarComponent],
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
  isLoading: boolean = false;
  errorMessage: string = '';
  isSortAscending: boolean = true;


  private productService = inject(ProductService);


  /**
   * Inicializa el componente obteniendo los productos.
   */
  ngOnInit(): void 
  {
    this.ObtenerProductos();
  }

  constructor(private router: Router) {}

  /**
   * Obtiene todos los productos del servicio y los almacena en el array de productos.
   */
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

  /**
   * Elimina un producto por su ID.
   * @param productId - ID del producto a eliminar.
   */
  async deleteProduct(productId: string) {
    try {
      if (confirm('¿Está seguro que desea eliminar este producto?')) {
        this.isLoading = true;
        await this.productService.DeleteProduct(productId);
        
        // Update the arrays
        this.productsArray = this.productsArray.filter(p => p.id !== productId);
        this.filteredArray = this.filteredArray.filter(p => p.id !== productId);
        
        // Recalculate pagination
        this.totalPages = Math.ceil(this.productsArray.length / this.pageSize);
        this.paginate();
        
        // Show success message (optional)
        // You could use a toast notification service here
        alert('Producto eliminado exitosamente');
      }
    } catch (error: any) {
      this.errorMessage = 'Error al eliminar el producto: ' + error.message;
      console.error('Error al eliminar el producto:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Filtra los productos por nombre.
   */
  filterProductsByName() : void 
  {
    const query  = this.searchQuery.toLowerCase();
    this.filteredArray = this.productsArray.filter((product) =>
      product.name
      .toLowerCase()
      .includes(query)
    );
  }

  /**
   * Filtra los productos por tipo.
   */
  filterProductsByType() : void 
  {
    if (!this.searchType) {
      this.filteredArray = this.productsArray; 
      return;
    }
    
    this.filteredArray = this.productsArray.filter((product) =>
      product.type.toLowerCase() === this.searchType.toLowerCase()
    );
  }

  /**
   * Ordena los productos por precio.
   */
  sortByPrice(): void {
    this.isSortAscending = !this.isSortAscending; // mostrar el orden contrario
    
    this.filteredArray.sort((a, b) => {
      if (this.isSortAscending) {
        return a.price - b.price; // orden ascendente
      } else {
        return b.price - a.price; // orden descendente
      }
    });
  }

  /**
   * Navega a la página de edición del producto.
   * @param productId - ID del producto a editar.
   */
  onEditProduct(productId: string) {
    this.router.navigate([`/products/edit/${productId}`]);
    console.log(productId)
  }

  /**
   * Pagina los productos según la página actual y el tamaño de página.
   */
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredArray = this.productsArray.slice(startIndex, endIndex);
  }

  /**
   * Cambia a la página especificada.
   * @param page - Número de la página a la que se desea ir.
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }
}
