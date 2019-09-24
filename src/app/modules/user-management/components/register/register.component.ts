import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserManagementService } from "../../services/user-management.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  email: any;
  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) {}
  registerForm: FormGroup;
  group: FormGroup;
  unamePattern = "^[a-zA-Z]*$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  ngOnInit() {
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
        Validators.minLength(6)
      ]),
      conformpwd: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.isValueChanged();
  }

  isValueChanged() {
    this.registerForm.get("conformpwd").valueChanges.subscribe(value => {
      if (value !== this.registerForm.get("password").value) {
        this.registerForm
          .get("conformpwd")
          .setValidators([this.isValidPassword.bind(this)]);
      }
    });

    this.registerForm.get("name").valueChanges.subscribe(value => {
      if (value === "charan") {
        this.registerForm.get("phone").setValue("9159784056");
      } else {
        this.registerForm.get("phone").setValue("");
      }
    });
  }

  isValidPassword(control) {
    console.log("isValidPassword");

    if (control.value === this.registerForm.get("password").value && control.value.trimLeft()!=='') {
      console.log("not null passed");
      return null;
    }
    console.log(" null passed");

    return { notMatched: true };
  }

  onSubmit() {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      console.log("Submitted Succesfully", this.registerForm.value);
      const { name, password, email, phone } = this.registerForm.value;
      const fd = {
        email_id: email,
        phone_num: phone,
        name,
        password
      };
      //this.userManagementService.userRegistration(fd);
      this.router.navigate(["/user"]);
      // this.registerservice.submitForm(fd).subscribe(
      //   res => {
      //     console.log("success response", res);
      //   },
      //   error => {
      //     console.log("error response", error);
      //   }
      // );
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
