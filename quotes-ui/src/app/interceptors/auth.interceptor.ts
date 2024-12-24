import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Retrieve the token from localStorage or any other storage
        const token = localStorage.getItem('token');

        // If the token exists, attach it to the Authorization header
        if (token) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(clonedReq);
        }

        // Proceed without modification if no token
        return next.handle(req);
    }
}
