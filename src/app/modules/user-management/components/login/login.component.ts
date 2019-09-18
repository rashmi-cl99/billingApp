import { Component, OnInit, HostListener } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserManagementService } from "../../services/user-management.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hide = true; //used for password hide and show icon
  loginForm: FormGroup;
  innerWidth: any; //to check the width of the screen
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  // host listener used to check the size of the width
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear(); //clearing the local storage when user navigates to login page
    this.innerWidth = window.innerWidth; //updating the screen width when screen loads
    // defining the form control
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  // method is used to get the error message for the email field
  getErrorMessage() {
    return this.loginForm.get("username").hasError("required")
      ? "You must enter a value"
      : this.loginForm.get("username").hasError("email")
      ? "Not a valid email"
      : "";
  }

  // method is used to get the error message for the password field
  getErrorMessagepwd() {
    return this.loginForm.get("password").hasError("required")
      ? "You must enter a value"
      : "";
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //satifies condition only when login form is valid
      this.userManagementService.submitForm(this.loginForm.value).subscribe(
        res => {
          // if (res.status == "success") {
            const { token, role_id, user_id, name } = res;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user_id);
            localStorage.setItem("roleId", role_id);
            localStorage.setItem("name", name);
            this.router.navigate(["/users"]);
          // } else {
          //   Swal.fire({
          //     type: "error",
          //     title: res.message
          //   });
          // }
        },
        error => {
          Swal.fire("login fail", error);
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.message
          });
        }
      );
    }
  }
}
