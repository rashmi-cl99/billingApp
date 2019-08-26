import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserManagementService {
  constructor(private httpClient: HttpClient) {}
  users = [];

  submitForm(data) {
    return this.httpClient.post("http://takatuf.zysk.in/login", data);
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
}
