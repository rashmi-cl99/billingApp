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
    this.forgotform = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email])
    });
  }
 
  getErrorMessage() 
  {
    return this.forgotform.get("username").hasError("required")
      ? "You must enter a value"
      : this.forgotform.hasError("username")
      ? "Not a valid email"
      : "";
  }

  forgotpwd() {
    console.log("adsfdsfsdf", this.forgotform);

    const fd = {
      username: this.forgotform.value.username
    };
    this.userManagementService.forgotpwd(fd).subscribe(
      res => {
        Swal.fire("success response", res,"success");
        this.router.navigate(['/login']);
      },
      error => {
       // Swal.fire("error response", error);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: error.message,
        });
      }
    );
    
  }


}