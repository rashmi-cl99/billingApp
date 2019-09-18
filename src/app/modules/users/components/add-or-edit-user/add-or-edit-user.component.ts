import { DialogData } from "../user-list/user-list.component";
import { Inject, Component, OnInit, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../services/users.service";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

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
  unamePattern = "^[a-zA-Z ]*$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  router: any;
  userList = [];
  

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
      role: data.role,
      shop: data.shop
    });
  }

  registerSubmit() {
    console.log(this.registerForm);
    
    if (this.registerForm.valid && this.dialogData["type"] === "Add User") {
      console.log("Submitted Succesfully", this.registerForm.value);

      this.usersService.registerSubmit(this.registerForm.value).subscribe(
        res => {
          this.dialogRef.close();
          this.usersService.getUsers().subscribe(res => {
          });
        },
        error => {
          console.log("error response", error);
        }
      );
    }  
    else
    {
     this.dialogData["type"] === "Edit User"
    console.log("Updated Succesfully", this.registerForm.value);
    const { name, email, phone,role,shop} = this.registerForm.value;
    
    const fd = {
      name,
      email: email,
      phone: phone,
      id: this.dialogData.user.id,
      role,
      shop
               };
     console.log("Updated id", this.dialogData.user.id);
    this.usersService.updateUser(this.dialogData.user.id,fd).subscribe(
      res => {
        Swal.fire("updated successfully", res);
        this.dialogRef.close();
        this.usersService.getUsers().subscribe(res => {
        });
             },
      error => {
        Swal.fire("not updated", error);
               }
      );
    }
  }

  getErrorMessage() {
    return this.registerForm.get("email").hasError("required")
      ? "You must enter a value"
      : this.registerForm.get("email").hasError("email")
      ? "Not a valid email"
      : "";
  }

  getErrorMessage1() {
    return this.registerForm.get("phone").hasError("required")
      ? "You must enter a value"
      : this.registerForm.get("phone").hasError("phone")
      ? "Not a valid phone"
      : "";
  }

  getErrorMessagename() {
    console.log("formgroupdsf", this.registerForm);
    return this.registerForm.get("name").hasError("required")
      ? "You must enter a value"
      : this.registerForm.get("name").hasError("name")
      ? "enter a valid name"
      : "";
  }
}
