import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpService } from 'src/app/shared/services/http.service';



@Injectable({
  providedIn: "root"
})
export class UserManagementService {
  constructor(private httpService: HttpService) {}
  users = [];

  submitForm(data) {
    return this.httpService.post("/login/",data).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }


  forgotpwd(data) {
    return this.httpService
      .post("/password-reset/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  resetpwd(data) {
    return this.httpService
      .post("/reset_password_confirm/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  changepwd(data) {
    return this.httpService
      .post("/change-password/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  checkValidToken(token) {
    return this.httpService
      .get("/verify-token/"+token)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => throwError(error || "Server error"))
      );
  }

  getUserprofiledetail() {
    return this.httpService.get(`/get-user-detail/`).pipe(
      map((res: any) => res),
      catchError((error: any) => throwError(error || "Server error"))
    );
  }

  updateUser(userDetails) {
    return this.httpService
      .patch(`/update-user-profile/`, userDetails)
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
}
