import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/modules/users/services/users.service';


@Injectable(
    {providedIn:'root'}
    )
export class AuthGuard implements CanActivate
{

   constructor(private router:Router,private userService:UserService)
   {

   }
   canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>
   {
    const token: string = localStorage.getItem('token');
    if (token) 
    {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
   }
  
}