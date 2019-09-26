import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { RegisterComponent } from "../components/register/register.component";
import { ForgotPasswordComponent } from "../components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "../components/reset-password/reset-password.component";
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { LoginGuard } from 'src/app/shared/guards/login.guard';
import { MyProfileComponent } from '../components/my-profile/my-profile.component';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-password/:token",
    component: ResetPasswordComponent
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
  },
  {
    path: "my-profile",
    component: MyProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class userManagementRouting {}
