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

  async GetProduct(productId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.get(`${this.baseUrl}/${Number(productId)}`)
      );
      return response;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }
  
  async CreateProduct(formData: FormData): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}`, formData)
      );
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async UpdateProduct(productId: string, formData: FormData): Promise<any> {
    try {
      // Check if your backend expects multipart/form-data
      const headers = {
      };

      const response = await firstValueFrom(
        this.http.put(`${this.baseUrl}/${productId}`, formData)
      );
      return response;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
  
  async DeleteProduct(productId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.http.delete(`${this.baseUrl}/${Number(productId)}`)
      );
      return response;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  getErrors(): string[] {
    return this.errors;
  }
  
}
