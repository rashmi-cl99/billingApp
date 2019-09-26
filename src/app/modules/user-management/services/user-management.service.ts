import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class UserManagementService {
  constructor(private httpClient: HttpClient) {}
  users = [];

  submitForm(data) {
    return this.httpClient.post("http://localhost:8000/login/", data).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }


  forgotpwd(data) {
    return this.httpClient
      .post("http://localhost:8000/password-reset/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  resetpwd(data) {
    return this.httpClient
      .post("http://localhost:8000/reset_password_confirm/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  changepwd(data) {
    return this.httpClient
      .post("http://localhost:8000/change-password/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  getUserprofiledetail() {
    return this.httpClient.get(`http://localhost:8000/get-user-detail/`).pipe(
      map((res: any) => res),
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }

  updateUser(userDetails) {
    return this.httpClient
      .patch(`http://localhost:8000/update-user-profile/`, userDetails)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }
  getRoles() {
    return this.httpClient.get("http://localhost:8000/role-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }
  getShops() {
    return this.httpClient.get("http://localhost:8000/shops-list/").pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }
}
