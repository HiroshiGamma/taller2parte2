import { Injectable } from '@angular/core';
import { PaginatedResponse, QueryObject } from '../interfaces/QueryObjectReceipt';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReceiptDto } from '../interfaces/ReceiptDto';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private readonly baseUrl = '/api/receipt';

  constructor(private http: HttpClient) {}

  /**
   * Create a new receipt
   */
  createReceipt(receipt: Partial<ReceiptDto>): Observable<ReceiptDto> {
    return this.http.post<ReceiptDto>(`${this.baseUrl}/CreateReceipt`, receipt);
  }

  /**
   * Get a specific receipt by ID
   */
  getReceipt(id: number): Observable<ReceiptDto> {
    return this.http.get<ReceiptDto>(`${this.baseUrl}/GetReceipt/${id}`);
  }

  /**
   * Get paginated list of receipts with optional filters
   */
  getReceipts(query: QueryObject): Observable<PaginatedResponse<ReceiptDto>> {
    let params = new HttpParams()
      .set('pageNumber', query.pageNumber.toString())
      .set('pageSize', query.pageSize.toString());

    if (query.name) {
      params = params.set('name', query.name);
    }

    if (query.isDescending !== undefined) {
      params = params.set('isDescending', query.isDescending.toString());
    }

    return this.http.get<PaginatedResponse<ReceiptDto>>(`${this.baseUrl}/receipts`, { params });
  }

  /**
   * Get all receipts for a specific user
   */
  getUserReceipts(userRut: string): Observable<ReceiptDto[]> {
    return this.http.get<ReceiptDto[]>(`${this.baseUrl}/user/${userRut}`);
  }

  downloadReceipt(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download/${id}`, {
      responseType: 'blob'
    });
  }
}

