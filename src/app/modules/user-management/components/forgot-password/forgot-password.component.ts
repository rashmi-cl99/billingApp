import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private userManagementService: UserManagementService,) { }
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

}