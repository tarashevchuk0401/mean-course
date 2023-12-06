import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export class ErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('inter')
    return next.handle(request).pipe(
      // console.log()
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        alert(error.error.message)
        return throwError(() => {
          const error: any = new Error('This is error number' );
          return error
        })
      })
    );
  }
}
