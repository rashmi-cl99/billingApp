import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagementService } from 'src/app/modules/user-management/services/user-management.service';


@Injectable(
    {providedIn:'root'}
    )
export class RoleGuard implements CanActivate
{

   constructor(private userManagementService:UserManagementService,private router:Router)
   {

   }
   canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean>
   {
    const role: string=localStorage.getItem('role');
    if (role != 'Admin' && role==='Accountant') 
    {
      this.router.navigateByUrl('/sales/bill');
      return false;
    }
    else if(role != 'Admin' && role==='Staff')
    {
        this.router.navigateByUrl('/sales');
        return false;
    }
    return true;
   }
//    canDeactivate(
//     component: UserListComponent,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState: RouterStateSnapshot
//   ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
//     //return this.permissions.canDeactivate(this.currentUser, route.params.id);
//     const role: string=localStorage.getItem('role');
//     if (role === 'Admin') 
//     {
//       return true;
//     }
//       return false;
//    }
  
}