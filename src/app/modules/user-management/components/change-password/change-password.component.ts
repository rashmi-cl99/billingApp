import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  old_password:any;
  new_password: any;
  confirm_password: any;
  
  

  constructor(private userManagementService: UserManagementService) {}
  hide:true
  ngOnInit() {
    console.log("change password page")
    this.changeForm = new FormGroup({
      old_password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      new_password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      confirm_password: new FormControl(null,[Validators.required,Validators.minLength(8)])
    });
    this.isValueChanged();
  }

  isValueChanged() {
    this.changeForm.get("confirm_password").valueChanges.subscribe(value => {
      if (value !== this.changeForm.get("new_password").value) {
        this.changeForm
          .get("confirm_password")
          .setValidators([this.isValidPassword.bind(this)]);
      }
    });
  }
  isValidPassword(control) {
    console.log("isValidPassword");

    if (
      control.value === this.changeForm.get("new_password").value &&
      control.value.trimLeft() !== ""
    ) {
      console.log("not null passed");
      return null;
    }
    console.log(" null passed");

    return { notMatched: true };
  }



  getErrorMessageoldpwd() {
    return this.changeForm.get("old_password").hasError("required")
      ? "You must enter a value"
      : "";
  }

  getErrorMessagenewpwd() {
    return this.changeForm.get("new_password").hasError("required")
      ? "You must enter a value"
      : "";
  }

  getErrorMessageconfpwd() {
    return this.changeForm.get("confirm_password").hasError("required")
      ? "You must enter a value"
      : "";
  }
  
  changepwd() {
    console.log(this.changeForm.valid);
    const fd = {
      old_password:this.changeForm.value.old_password,
      new_password: this.changeForm.value.new_password,
      confirm_password:this.changeForm.value.confirm_password,
    
    };
    this.userManagementService.changepwd(fd).subscribe(
      res => {
        Swal.fire("success response", res);
      },
      error => {
        Swal.fire("error response", error);
      }
    );
  }


}
