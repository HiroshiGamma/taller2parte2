import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  const token = localStorage.getItem('token');
  console.log('Token: ', token);

  let modifiedReq = req;
  if (token){
    modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
  
  return next(modifiedReq).pipe( tap((event) => {console.log('Interceptor: ', event);
    if (event instanceof HttpResponse){
      //do something if token
    }
  }));

};
