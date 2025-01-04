import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QueryObjectProduct } from '../interfaces/QueryObjectProduct';
import { ResponseAPIGetAllProducts } from '../interfaces/ResponseAPIGetAllProducts';
import { firstValueFrom } from 'rxjs';


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
}
