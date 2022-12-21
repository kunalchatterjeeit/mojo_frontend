import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { LocalStorageService } from './services/local-storage.service';
import { LocalStoragekey } from './localStorageKey';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //this.loaderService.show();
        const token = new LocalStorageService().get(LocalStoragekey.UserToken);

        if (!token) {
            return next.handle(req);
        }

        const reqWithToken = req.clone({
            headers: req.headers.set('Authorization', `Bearer ` + `${token}`),
        });

        return next.handle(reqWithToken).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log('Unauthorized access!', err.error);
                    throw new Error("Unauthorized access");
                }
                else {
                    throw new Error(err.message);
                }
            }
            return of(err);
        })
            //finalize(()=> this.loaderService.hide());
        );
    }
}