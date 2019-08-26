import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  users = [
    {
      conformpwd: "sdfdsfdsfdsf",
      email_id: "dsfsdf@sdf.com",
      name: "charan",
      password: "sdfdsfdsfdsf",
      phone_num: "2343243243",
      id: 0
    }
  ];
  submitForm(data) {
    console.log("registerform", data);
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
  getUser(id) {
    return this.users.filter(user => {
      if (+user.id === +id) {
        return user;
      }
    })[0];
  }
  updateUser(userDetails) {
    const users = this.users;
  }
}
