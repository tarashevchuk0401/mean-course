import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private matDialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('inter')
    return next.handle(request).pipe(
      // console.log()
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.matDialog.open(ErrorComponent, { data: { message: error.error.message } })
        return throwError(() => {
          const error: any = new Error('This is error number');
          return error
        })
      })
    );
  }
}
