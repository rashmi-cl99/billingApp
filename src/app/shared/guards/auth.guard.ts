import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagementService } from 'src/app/modules/user-management/services/user-management.service';

@Injectable(
    {providedIn:'root'}
    )
export class AuthGuard implements CanActivate
{

   constructor(private userManagementService:UserManagementService,private router:Router)
   {

   }
   canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>
   {
    const token: string = localStorage.getItem('token');
    if (token) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
   
}