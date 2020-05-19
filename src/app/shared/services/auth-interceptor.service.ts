import { Injectable } from "@angular/core";
import {Router} from "@angular/router";
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

  constructor(private router:Router) {}
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
      console.log(
        "Request for success",
        req.url,
        " Response Status ",
        event.status,
        " With error ",
        event
      );
    }
  }

  handleError(req: HttpRequest<any>, event) {
    if (event instanceof HttpErrorResponse) {
      if(event.status === 401)
      {
        this.router.navigate(['/login']);
      }
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
