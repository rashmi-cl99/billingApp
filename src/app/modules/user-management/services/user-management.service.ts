import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
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
      catchError((error: any) => Observable.throw(error || "Server error"))
    );
  }


  userRegistration(fd) {
    const reformattedData = {
      ...fd,
      id: this.users.length
    };
    this.users.push(reformattedData);
  }

  getUsers() {
    return this.users;
  }

  forgotpwd(data) {
    return this.httpClient
      .post("http://localhost:8000/password-reset/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }

  resetpwd(data) {
    return this.httpClient
      .post("http://localhost:8000/reset_password_confirm/", data)
      .pipe(
        map((res: any) => res),
        catchError((error: any) => Observable.throw(error || "Server error"))
      );
  }
}
