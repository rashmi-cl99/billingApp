import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { UserManagementService } from '../../services/user-management.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: any;
  hide = true;

  constructor(
   private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.resetForm = new FormGroup({
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
    this.route.params.subscribe((params: Params) => {
      this.token = params["token"];
      console.log("token=", this.token);
    });
  }

  getErrorMessagenewpwd() {
    return this.resetForm.get("newPassword").hasError("required")
      ? "You must enter a value"
      : "";
  }

  getErrorMessageconfpwd() {
    return this.resetForm.get("confirmPassword").hasError("required")
      ? "You must enter a value"
      : "";
  }
  resetpwd() {
    console.log(this.resetForm.valid);
    const fd = {
      newPassword: this.resetForm.value.newPassword,
      confirmPassword: this.resetForm.value.confirmPassword,
      token: this.token
    };
    this.userManagementService.resetpwd(fd).subscribe(
      res => {
        Swal.fire("password reset successfully", res, "success");
        this.router.navigate(["/login"]);
      },
      error => {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: error.message
        });
      }
    );
  }
}
