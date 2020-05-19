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
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
  // emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"

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
    if (localStorage.getItem("token")) {
      this.redirect(localStorage.getItem("role"));
    }

    this.innerWidth = window.innerWidth; //updating the screen width when screen loads
    // defining the form control
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl(null, [Validators.required])
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

  redirect(role) {
    if (role === "Admin") {
      this.router.navigate(["/sales"]);
    } else if (role === "User") {
      this.router.navigate(["/sales"]);
    } else {
      this.router.navigate(["/sales/bill"]);
    }
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    // console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.userManagementService.submitForm(this.loginForm.value).subscribe(
        res => {
          const { token, name, role } = res;
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("role", role);
          this.redirect(role);
        },
        error => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.error.error
          });

          const validationErrors = error.error;
          if (error.status === 400) {
            Object.keys(validationErrors).forEach(errorKey => {
              const formControl = this.loginForm.get(errorKey);
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: validationErrors[errorKey]
                });
              }
            });
          }
        }
      );
    }
  }
}
