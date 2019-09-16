import { Component, OnInit, HostListener } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserManagementService } from "../../services/user-management.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  token: any;
  innerWidth: any;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    localStorage.clear();
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl(null, Validators.required)
    });
  }
  getErrorMessage() {
    return this.loginForm.get("username").hasError("required")
      ? "You must enter a value"
      : this.loginForm.get("username").hasError("email")
      ? "Not a valid email"
      : "";
  }
  getErrorMessagepwd() {
    return this.loginForm.get("password").hasError("required")
      ? "You must enter a value"
      : "";
  }
  onSubmit() {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.userManagementService.submitForm(this.loginForm.value).subscribe(
        res => {
          console.log(res);
          console.log('response', res)
          if(res.status == 'success') {
            const { token, role_id, user_id ,name} = res;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user_id);
            localStorage.setItem("roleId", role_id);
            localStorage.setItem("name", name);
            this.router.navigate(["/users"]);
          } else {
            Swal.fire({
              type: 'error',
              title: res.message,
            })
          }
        },
        error => {
          Swal.fire("login fail", error);
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text:error.message,
          });
        }
      );
    }
  }
}
