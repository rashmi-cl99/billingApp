import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userDetails=null;
  myprofileForm:FormGroup;
  unamePattern = "^[a-zA-Z ]*$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  disabled;
  constructor(private userManagementService:UserManagementService,private router:Router) { }

  ngOnInit() {

    this. userManagementService.getUserprofiledetail().subscribe(res=>{
          this.userDetails=res;
         this.editUserDetails(res);
        });
    this.myprofileForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.mobnumPattern)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(this.emailPattern),
      ]),
     
      role: new FormControl(null, Validators.required),
      shop: new FormControl(null, Validators.required)
    });
  }
  editUserDetails(data) {
    console.log("patch values asdasdasd", data);
    this.myprofileForm.patchValue({
      name: data.name,
      phone: data.phone,
      email: data.email,
      role:data.role,
      shop:data.shop
    });
  }
  getErrorMessage() {
    return this.myprofileForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.myprofileForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }

  getErrorMessage1() {
    return this.myprofileForm.get("phone").hasError("required")
      ? "You must enter a value"
      : this.myprofileForm.get("phone").hasError("phone")
      ? "Not a valid phone"
      : "";
  }

  getErrorMessagename() {
    console.log("formgroupdsf", this.myprofileForm);
    return this.myprofileForm.get("name").hasError("required")
      ? "You must enter a value"
      : this.myprofileForm.get("name").hasError("name")
      ? "enter a valid name"
      : "";
  }

  onSubmit() 
  {
    
      console.log("Updated Succesfully", this.myprofileForm.value);
      const { name, email, phone} = this.myprofileForm.value;
      
      const fd = {
        name,
        email: email,
        phone: phone,
        id: this.userDetails.id,
       
                 };
      this.userManagementService.updateUser(fd).subscribe(
        res => {
          Swal.fire(
            {
          type: 'success',
          text: res.Success,
  
            }
          )
               },
        error => {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.error
          });
          const validationErrors = error.error;
          if (error.status === 400) {
            Object.keys(validationErrors).forEach(errorKey => {
              const formControl = this.myprofileForm.get(errorKey);
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
