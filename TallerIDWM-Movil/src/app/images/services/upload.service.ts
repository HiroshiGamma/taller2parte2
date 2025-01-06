import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // URL para subir imágenes a Cloudinary
  UrlUploadimg: string = 'https://api.cloudinary.com/v1_1/dt8dw9v57/image/upload';

  constructor(private http: HttpClient) { }
  
  /**
   * Servicio de carga de imágenes
   * @param data - Datos de la imagen a subir
   * @returns Observable con la respuesta de la solicitud HTTP
   */
  uploadService(data: any): Observable<any>{
    return this.http.post(this.UrlUploadimg, data);
  }
}
