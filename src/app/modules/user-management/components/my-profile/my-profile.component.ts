import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userDetails=null;
  myprofileForm:FormGroup;
  // unamePattern = "[a-zA-Z\s]+$";
  unamePattern = "[a-zA-Z0-9_]+.*$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
  roles = [];
  shops = [];
  userRole = null;
  shopRole = null;
  constructor(private userManagementService:UserManagementService,private router:Router) { }

  ngOnInit() {
     this.userRole = localStorage.getItem('role');
     this.shopRole = localStorage.getItem('shop');
    this.userManagementService.getRoles().subscribe(res => {
      console.log("roles got", res);
      this.roles = res;
    });
    this.userManagementService.getShops().subscribe(res => {
      console.log("shop got", res);
      this.shops = res;
    });
    
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
     role:new FormControl(null),
     shop: new FormControl(null)

      // role: new FormControl(null, Validators.required),
      // shop: new FormControl(null, Validators.required)
    });
    //this.myprofileForm.controls['email'].disable();
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
      ? ""
      : "Not a valid email";
  }

  getErrorMessage1() {
    return this.myprofileForm.get("phone").hasError("required")
      ? "You must enter a value"
      : this.myprofileForm.get("phone").hasError("mobnumPattern")
      ? ""
      : "Not a valid phone";
  }

  getErrorMessagename() {
    console.log("formgroupdsf", this.myprofileForm);
    return this.myprofileForm.get("name").hasError("required")
      ? "You must enter a value"
      : this.myprofileForm.get("name").hasError("unamePattern")
      ? ""
      : "enter a valid name";
  }

  onSubmit() 
  {
    if(this.myprofileForm.valid)
    {
      console.log("Updated Succesfully", this.myprofileForm.value);
      const { name, email, phone,role,shop} = this.myprofileForm.value;
      
      const fd = {
        name:name,
        email: email,
        phone: phone,
        id: this.userDetails.id,
        role:role,
        shop:shop
       
                 };
      this.userManagementService.updateUser(fd).subscribe(
        res => {
          Swal.fire(
            {
          type: 'success',
          text: res.success,
  
            }
          )
               },
        error =>  {
          if(error.status === 401){
            localStorage.clear();
            this.router.navigate(["/login"]);
            alert("Token Expired, Please Login ");
          }else
        {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.error.error || error.error.email
          });
        }
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
 
}
