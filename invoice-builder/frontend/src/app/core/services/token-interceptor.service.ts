import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    const token = this.jwtService.getToken();
    if (token) {
      headersConfig['Authorization'] = `bearer ${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    // this is how we redirect to login if token is inactive
    return next.handle(_req).do(
      (event: HttpEvent<any>) => {},
      err => {
        // the err will come if the token expires
        if (err instanceof HttpErrorResponse) {
          // will throw a 401 if the token expires
          if (err.status === 401) {
            this.jwtService.destroyToken();
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
}
