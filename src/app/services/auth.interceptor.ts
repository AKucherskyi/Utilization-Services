import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      let token = localStorage.getItem('token');
      req = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`),
      });
    }

    return next.handle(req).pipe(
        tap(() => {},
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              console.log('Unauthorized');
              
            }
          }
        })
    );
  }
}
