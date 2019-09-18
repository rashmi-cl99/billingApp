import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
  token: any;

  constructor() {
    // this.token = localStorage.getItem('token');
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    // let request: HttpRequest<any>;
    // if(this.token != null) {
    //   request = req.clone({
    //     setHeaders: {
    //       Authorization: 'Bearer '+localStorage.getItem('token')
    //     }
    //   })
    // } else {
    //   request = req;
    // }

    // return next.handle(request);

    const token = localStorage.getItem("token");
    let request: HttpRequest<any> = token
      ? req.clone({
          headers: req.headers.set("Authorization", "Token " + token)
        })
      : req;
    return next
      .handle(request)
      .pipe(
        tap(
          event => this.handleResponse(req, event),
          error => this.handleError(req, error)
        )
      );
  }

  handleResponse(req: HttpRequest<any>, event) {
    if (event instanceof HttpResponse) {
      //     ' Response Status ', event.status,
      //     ' With body ', event.body);
    }
  }

  handleError(req: HttpRequest<any>, event) {
    if (event instanceof HttpErrorResponse) {
      console.error(
        "Request for ",
        req.url,
        " Response Status ",
        event.status,
        " With error ",
        event.error
      );
    }
  }
}
