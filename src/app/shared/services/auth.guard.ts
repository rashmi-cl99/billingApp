import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthInterceptorService } from './auth-interceptor.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor( private router: Router,private authService:AuthInterceptorService)
    {

    }
   
 canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['\login']);
      return false;
    }
    return true;
  }

}