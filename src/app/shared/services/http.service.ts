import { Injectable, EventEmitter } from '@angular/core';
import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';
import {
    RequestOptions,
    Response,
    Headers,
    ResponseContentType
} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService extends HttpClient {
    
    public serverError: EventEmitter<Response> = new EventEmitter();

  /**
     * Performs a request with `get` http method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string): Observable<any> {
      this.requestInterceptor();
      return super.get(this.getFullUrl(url))
      .pipe(
        catchError(this.onCatch),
        tap((res: Response) => {
            this.onSubscribeSuccess(res);
        }, (error: any) => {
            this.onSubscribeError(error);
        }),
        finalize(() => {
            this.onFinally();
        })
      )
  }

  patch(url: string,data:any): Observable<any> {
    this.requestInterceptor();
    return super.patch(this.getFullUrl(url),data)
    .pipe(
      catchError(this.onCatch),
      tap((res: Response) => {
          this.onSubscribeSuccess(res);
      }, (error: any) => {
          this.onSubscribeError(error);
      }),
      finalize(() => {
          this.onFinally();
      })
    )
}
  
 
  
 post(url: string, data: any) {
      this.requestInterceptor();
      return super.post(this.getFullUrl(url), data)
      .pipe(
        catchError(this.onCatch),
        tap((res: any) => {
            this.onSubscribeSuccess(res);
        }, (error: any) => {
            this.onSubscribeError(error);
        }),
        finalize(() => {
            this.onFinally();
        })
      )

  }



  /**
     * Build API url.
     * @param url
     * @returns {string}
     */
    private getFullUrl(url: string): string {
      // return full URL to API here
      return environment.baseUrl + url;
   }

   // Request interceptor
   private requestInterceptor(): void { }

   private responseInterceptor(): void { }
 
   // Error handler
   private onCatch(error: any, caught: Observable<any>): Observable<any> {
     return throwError(error);
   }
 
   private onSubscribeSuccess(res: Response): void { }
 
   private onSubscribeError(error: any): void {
     this.serverError.emit(error);
   }
 
   private onFinally(): void {
     this.responseInterceptor();
   }
 
}
