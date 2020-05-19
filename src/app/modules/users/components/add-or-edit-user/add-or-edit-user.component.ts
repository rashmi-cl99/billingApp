import { DialogData } from "../user-list/user-list.component";
import { Inject, Component, OnInit, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../services/users.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

@Component({
  selector: "app-add-or-edit-user",
  templateUrl: "./add-or-edit-user.component.html",
  styleUrls: ["./add-or-edit-user.component.scss"]
})
export class AddOrEditUserComponent implements OnInit {
  email: any;
  hide = true;

  roles = [];
  shops = [];
  registerForm: FormGroup;
  unamePattern = "[a-zA-Z0-9_]+.*$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  //  emailPattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$";
  router: any;
  userList = [];
  disableSubmit = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private usersService: UserService,
    public dialogRef: MatDialogRef<AddOrEditUserComponent>
  ) {}

  ngOnInit() {
    console.log("this.data", this.dialogData);
    this.usersService.getRoles().subscribe(res => {
      console.log("roles got", res);
      this.roles = res;
    });
    this.usersService.getShops().subscribe(res => {
      console.log("shop got", res);
      this.shops = res;
    });

    this.registerForm = new FormGroup({
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
        Validators.pattern(this.emailPattern)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      role: new FormControl(null, Validators.required),
      shop: new FormControl(null, Validators.required)
    });

    this.dialogData["type"] === "Edit User" &&
      this.editUserDetails(this.dialogData["user"]);
  }

  editUserDetails(data) {
    console.log("patch values asdasdasd", data);
    this.registerForm.patchValue({
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: atob(data.text_password),
      role: data.role,
      shop: data.shop
    });
  }

  registerSubmit() {
    if (this.registerForm.valid && this.dialogData["type"] === "Add User") {
      console.log("Submitted Succesfully", this.registerForm.value);
      this.disableSubmit = true;
      this.usersService.registerSubmit(this.registerForm.value).subscribe(
        response => {
          Swal.fire({
            type: "success",
            text: response.message
          });

          this.dialogRef.close();
          this.usersService.getUsers().subscribe(response => {});
        },
        error => {
          this.disableSubmit = false;
          const validationErrors = error.error;
          if (error.status === 400) {
            Object.keys(validationErrors).forEach(errorKey => {
              const formControl = this.registerForm.get(errorKey);
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
    } else if (
      this.registerForm.valid &&
      this.dialogData["type"] === "Edit User"
    ) {
      console.log("this.dialogData", this.dialogData);

      const {
        name,
        email,
        phone,
        password,
        role,
        shop
      } = this.registerForm.value;
      this.disableSubmit = true;

      const fd = {
        name,
        email: email,
        phone: phone,
        id: this.dialogData.user.id,
        text_password: password,
        role,
        shop
      };
      this.usersService.updateUser(this.dialogData.user.id, fd).subscribe(
        resp => {
          Swal.fire({
            type: "success",
            text: resp.updated
          });
          this.dialogRef.close();
          this.usersService.getUsers().subscribe(resp => {});
        },
        error => {
          this.disableSubmit = false;
          // Swal.fire({
          //   type: "error",
          //   title: "Oops...",
          //   //text: error.error.phone,
          //   text: error.error.email
          // });
          const validationErrors = error.error;
          if (error.status === 400) {
            Object.keys(validationErrors).forEach(errorKey => {
              const formControl = this.registerForm.get(errorKey);
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

  getErrorMessage() {
    return this.registerForm.get("email").hasError("required")
      ? "Email is required"
      : this.registerForm.get("email").hasError("emailPattern")
      ? ""
      : "Not a valid email.";
  }

  getErrorMessage1() {
    return this.registerForm.get("phone").hasError("required")
      ? "Phone number is required"
      : this.registerForm.get("phone").hasError("mobnumPattern")
      ? ""
      : "Not a valid phone number.";
  }

  getErrorMessagename() {
    console.log("formgroupdsf", this.registerForm);
    return this.registerForm.get("name").hasError("required")
      ? "Username is required"
      : this.registerForm.get("name").hasError("unamePattern")
      ? ""
      : "enter a valid name.";
  }
}
