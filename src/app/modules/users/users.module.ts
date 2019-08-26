import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { usersRouting } from "./routes/users-routing.module";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [AddUserComponent, EditUserComponent, UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    usersRouting,
    HttpClientModule,
    SharedModule,
    AvatarModule
  ]
})
export class UsersModule {}
