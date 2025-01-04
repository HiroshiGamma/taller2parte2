import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  UrlUploadimg: string = 'https://api.cloudinary.com/v1_1/dt8dw9v57/image/upload';

  constructor(private http: HttpClient) { }
  
  uploadService(data: any): Observable<any>{
    return this.http.post(this.UrlUploadimg, data);
  }
}
