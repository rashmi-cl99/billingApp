import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { Observable, Subject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  
  usersListSubscription = new EventEmitter<any[]>();

  
  getUsers() {
  return this.httpClient.get("http://localhost:8000/add-user/").pipe(
      map((res: any) => {
        this.usersListSubscription.emit(res);
        return res;
      }),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );

  }

  statusdetail(id, is_active) {
    return this.httpClient
      .post(`http://localhost:8000/enable-disable/${id}/`, is_active)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }
  getRoles() {
    return this.httpClient.get("http://localhost:8000/role-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }
  getShops() {
    return this.httpClient.get("http://localhost:8000/shops-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }
  registerSubmit(data) {
    return this.httpClient
      .post("http://localhost:8000/add-user/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }

  getUserdetail(id) {
    return this.httpClient.get(`http://localhost:8000/add-user/${id}/`).pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }

  updateUser(id,userDetails) {
    return this.httpClient
      .patch(`http://localhost:8000/add-user/${id}/`, userDetails)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }
   
}
