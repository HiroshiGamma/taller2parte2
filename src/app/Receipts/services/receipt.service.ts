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
   * Crear un nuevo recibo
   * @param receipt - Datos parciales del recibo a crear
   * @returns Observable con el recibo creado
   */
  createReceipt(receipt: Partial<ReceiptDto>): Observable<ReceiptDto> {
    return this.http.post<ReceiptDto>(`${this.baseUrl}/CrearRecibo`, receipt);
  }

  /**
   * Obtener un recibo específico por ID
   * @param id - ID del recibo a obtener
   * @returns Observable con el recibo obtenido
   */
  getReceipt(id: number): Observable<ReceiptDto> {
    return this.http.get<ReceiptDto>(`${this.baseUrl}/ObtenerRecibo/${id}`);
  }

  /**
   * Obtener una lista paginada de recibos con filtros opcionales
   * @param query - Objeto de consulta con los parámetros de paginación y filtros
   * @returns Observable con la respuesta paginada de recibos
   */
  getReceipts(query: QueryObject): Observable<PaginatedResponse<ReceiptDto>> {
    let params = new HttpParams()
      .set('numeroPagina', query.pageNumber.toString())
      .set('tamañoPagina', query.pageSize.toString());

    if (query.name) {
      params = params.set('nombre', query.name);
    }

    if (query.isDescending !== undefined) {
      params = params.set('esDescendente', query.isDescending.toString());
    }

    return this.http.get<PaginatedResponse<ReceiptDto>>(`${this.baseUrl}/recibos`, { params });
  }

  /**
   * Obtener todos los recibos de un usuario específico
   * @param userRut - RUT del usuario
   * @returns Observable con la lista de recibos del usuario
   */
  getUserReceipts(userRut: string): Observable<ReceiptDto[]> {
    return this.http.get<ReceiptDto[]>(`${this.baseUrl}/usuario/${userRut}`);
  }

  /**
   * Descargar un recibo específico por ID
   * @param id - ID del recibo a descargar
   * @returns Observable con el Blob del recibo descargado
   */
  downloadReceipt(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/descargar/${id}`, {
      responseType: 'blob'
    });
  }
}

