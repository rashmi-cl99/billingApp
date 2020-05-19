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
  token: any;//this is used to store the token value
  hide = true;//this is used to hide and show the password

  constructor(
   private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //form control for newPassword and confirmPassword
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
    //this is used to get token value from url
    this.route.params.subscribe((params: Params) => {
      this.token = params["token"];
      console.log("token=", this.token);
    });

    this.isValueChanged();
  }

  isValueChanged() {
    this.resetForm.get("confirmPassword").valueChanges.subscribe(value => {
      if (value !== this.resetForm.get("newPassword").value) {
        this.resetForm
          .get("confirmPassword")
          .setValidators([this.isValidPassword.bind(this)]);
      }
    });
  }

  isValidPassword(control) {
    console.log("isValidPassword");

    if (
      control.value === this.resetForm.get("newPassword").value &&
      control.value.trimLeft() !== ""
    ) {
      console.log("not null passed");
      return null;
    }
    console.log(" null passed");

    return { notMatched: true };
  }

  //this method is used to show error message for newPassword
  getErrorMessagenewpwd() {
    return this.resetForm.get("newPassword").hasError("required")
      ? "You must enter a value"
      : "";
  }

  //this method is used to show error message for confirmPassword
  getErrorMessageconfpwd() {
    return this.resetForm.get("confirmPassword").hasError("required")
      ? "You must enter a value"
      : "";
  }

  //this method is used for service integration of resetPassword
  resetpwd() {
  
    console.log(this.resetForm.valid);
    
    if(this.resetForm.valid){

      this.userManagementService.checkValidToken(this.token).subscribe(
        res => {
          this.resetPassword();
        },
        error => {;
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.error.error
          });;
        }
      );
      
    }
  }


  resetPassword(){

    const fd = {
      new_password: this.resetForm.value.newPassword,
      confirm_password: this.resetForm.value.confirmPassword,
      token: this.token
    };

    this.userManagementService.resetpwd(fd).subscribe(
      res => {
        
        Swal.fire("password reset successfully", res, "success");
        this.router.navigate(["/login"]);
      },
      error => {;
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: error.error.non_field_errors || error.error.error || error.error.new_password || error.error.confirm_password
        });
        
          const validationErrors = error.error;
          if (error.status === 400) {
            Object.keys(validationErrors).forEach(errorKey => {
              const formControl = this.resetForm.get(errorKey);
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
