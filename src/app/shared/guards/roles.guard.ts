import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable(
    {providedIn:'root'}
    )
export class RolesGuard implements CanActivate
{

   constructor(private router:Router)
   {

   }
   canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>
   {
    const role: string=localStorage.getItem('role');
    if (role != 'Admin' && role!='Staff' && role==='Accountant') 
    {
      this.router.navigateByUrl('/sales/bill');
      return false;
    }
    else if(role != 'Admin' && role!='Accountant' && role==='Staff')
    {
        this.router.navigateByUrl('/sales');
        return false;
    }
    return true;
  }
  
}