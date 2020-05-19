import { HttpClient } from "@angular/common/http";
import { Injectable, EventEmitter } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { Observable, Subject, throwError, observable } from "rxjs";
import { HttpService } from 'src/app/shared/services/http.service';


@Injectable({
  providedIn: "root"
})
export class UserService {
  error=new Subject<string>();
  constructor(private httpClient: HttpClient,private httpService: HttpService) {}

  usersListSubscription = new EventEmitter<any[]>();

  getUsers() {
    return this.httpService.get("/add-user/").pipe(
      map((res: any) => {
        this.usersListSubscription.emit(res);
        return res;
      }),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  statusdetail(id, is_active) {
    return this.httpService
      .post(`/enable-disable/${id}/`, is_active)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }
  getRoles() {
    return this.httpService.get("/role-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }
  getShops() {
    return this.httpService.get("/shops-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }
  registerSubmit(data) {
    return this.httpService.post("/add-user/", data).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
      );
  }

  getUserdetail(id) {
    return this.httpService.get(`/add-user/${id}/`).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  updateUser(id, userDetails) {
    return this.httpService
      .patch(`/add-user/${id}/`, userDetails)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }
}
