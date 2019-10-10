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
    const role: string=localStorage.getItem('role');
    if (token) 
    {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  //   if(token)
  // {
  //     if(role === 'Admin')
  //     {
  //         return true;
  //     }
  //     else if(role === 'Accountant')
  //     {
  //          //this.router.navigateByUrl('/sales/bill');
  //          return true;

  //     }
  //     else if(role === 'Staff')
  //     {
  //       //this.router.navigateByUrl('/sales');
  //       return true;
  //     }
     
  //  }
  //  this.router.navigateByUrl('/login');
  //  return false;
  // }

  // if(token)
  // {
  //   if(role === 'Admin')
  //   {
  //     return true;
  //   }
  //   this.router.navigateByUrl('/login');
  //   return false;
  // }

  // if(token)
  // {
  //   if(role === 'Accountant')
  //   {
  //     return true;
  //   }
  //   this.router.navigateByUrl('/login');
  //   return false;
  // }

  // if(token)
  // {
  //   if(role === 'Staff')
  //   {
  //     return true;
  //   }
  //   this.router.navigateByUrl('/users');
  //   return false;
  // }
   
  }
  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
  //   const role: string=localStorage.getItem('role');
  //   if(role === 'Accountant')
  //   {
  //     this.router.navigateByUrl('/sales/Bill');
  //     return true;
  //   }
    
  //   return false;
  // }
  
}