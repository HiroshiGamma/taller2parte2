import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
          const username = event.body?.username; // Ensure username is extracted from the response body
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
          console.error('Unauthorized request you are not admin');
        }
      }
    })
  );
};
