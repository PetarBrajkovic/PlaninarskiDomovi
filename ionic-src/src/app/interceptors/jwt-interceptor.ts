import { AuthState } from './../store/auth/auth.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(AuthState.token);
        req = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });

        return next.handle(req);
    }
}