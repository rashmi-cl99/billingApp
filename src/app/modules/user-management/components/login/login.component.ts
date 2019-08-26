import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserManagementService } from "../../services/user-management.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  title = "billingapp";
  hide = true;

  loginForm: FormGroup;

  constructor(private userManagementService: UserManagementService,private router:Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    console.log(this.loginForm);

    if (this.loginForm.valid) {
      this.router.navigate(['users'])
      // this.userManagementService.submitForm(this.loginForm.value).subscribe(
      //   res => {
      //     console.log("success response", res);
      //   },
      //   error => {
      //     console.log("error response", error);
      //   }
      // );
    }
  }
}
