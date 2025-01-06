import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QueryObjectProduct } from '../interfaces/QueryObjectProduct';
import { ResponseAPIGetAllProducts } from '../interfaces/ResponseAPIGetAllProducts';
import { firstValueFrom } from 'rxjs';
import { ProductDto } from '../interfaces/ProductDto';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = "http://localhost:5042/api/Product";
  public errors: string[] =[];
  private http = inject(HttpClient);
  
  /**
   * Obtiene todos los productos.
   * @returns Una promesa que resuelve con una lista de productos.
   */
  async GetAllProducts(): Promise<ResponseAPIGetAllProducts[]> {
    try {
      const response = await firstValueFrom(
      this.http.get<ResponseAPIGetAllProducts[]>(`${this.baseUrl}`)
      );
      return Promise.resolve(response);
    } catch (error){
      console.log(error);
      let e = error as HttpErrorResponse;
      return Promise.reject(error);
    }
  }

  /**
   * Obtiene un producto por su ID.
   * @param productId El ID del producto.
   * @returns Una promesa que resuelve con el producto.
   */
  async GetProduct(productId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.baseUrl}/${Number(productId)}`)
      );
      return response;
    } catch (error) {
      console.error('Error obteniendo el producto:', error);
      throw error;
    }
  }
  
  /**
   * Crea un nuevo producto.
   * @param formData Los datos del formulario del producto.
   * @returns Una promesa que resuelve con la respuesta de la creación.
   */
  async CreateProduct(formData: FormData): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}`, formData)
      );
      return response;
    } catch (error) {
      console.error('Error creando el producto:', error);
      throw error;
    }
  }

  /**
   * Actualiza un producto existente.
   * @param productId El ID del producto.
   * @param formData Los datos del formulario del producto.
   * @returns Una promesa que resuelve con la respuesta de la actualización.
   */
  async UpdateProduct(productId: string, formData: FormData): Promise<any> {
    try {
      // Verifica si tu backend espera multipart/form-data
      const headers = {
      };

      const response = await firstValueFrom(
        this.http.put(`${this.baseUrl}/${productId}`, formData)
      );
      return response;
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      throw error;
    }
  }
  
  /**
   * Elimina un producto por su ID.
   * @param productId El ID del producto.
   * @returns Una promesa que resuelve con la respuesta de la eliminación.
   */
  async DeleteProduct(productId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.delete(`${this.baseUrl}/${Number(productId)}`)
      );
      return response;
    } catch (error) {
      console.error('Error eliminando el producto:', error);
      throw error;
    }
  }

  /**
   * Obtiene los errores.
   * @returns Una lista de errores.
   */
  getErrors(): string[] {
    return this.errors;
  }
  
}
