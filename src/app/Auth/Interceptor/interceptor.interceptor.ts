import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

/**
 * Interceptor de HTTP que añade el token de autorización a las solicitudes y maneja la respuesta.
 * @param req La solicitud HTTP original.
 * @param next Función que maneja la solicitud HTTP.
 * @returns Un Observable que emite eventos HTTP.
 */
export const interceptorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  const token = localStorage.getItem('token')?.replace(/"/g, ''); 

  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(modifiedReq).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const newToken = event.headers.get('Authorization')?.split(' ')[1];
          const username = event.body?.username;
          if (newToken) {
            localStorage.setItem('token', newToken);
          }
          if (username) {
            localStorage.setItem('username', username);
          }
        }
      },
      error: (error) => {
        if (error.status === 401) {
          console.error('Solicitud no autorizada, no eres administrador');
        }
      }
    })
  );
};
