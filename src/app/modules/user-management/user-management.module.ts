import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { userManagementRouting } from "./routes/user-management-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    userManagementRouting,
    HttpClientModule,
    SharedModule
  ]
})
export class UserManagementModule {}
