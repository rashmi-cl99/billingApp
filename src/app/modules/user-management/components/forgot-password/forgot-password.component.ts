import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private userManagementService: UserManagementService,
               private router: Router) { }
  forgotform: FormGroup;
  ngOnInit()
  {
    //form control for username
    this.forgotform = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email])
    });
  }
 //this method is used to show the error message for username field
  getErrorMessage()
  {
    return this.forgotform.get("username").hasError("required")
      ? "You must enter a value"
      : this.forgotform.hasError("username")
      ? "Not a valid email"
      : "";
  }

  //this method is used for service integration of forgotPassword
  forgotpwd() {
    // console.log("adsfdsfsdf", this.forgotform);

    const fd = {
      username: this.forgotform.value.username
    };
    this.userManagementService.forgotpwd(fd).subscribe(
      res => {
        Swal.fire("success response", res,"success");
        this.router.navigate(['/login']);
      },
      error => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: error.error.error,
        });

        const validationErrors = error.error;
        if (error.status === 400) {
          Object.keys(validationErrors).forEach(errorKey => {
            const formControl = this.forgotform.get(errorKey);
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
