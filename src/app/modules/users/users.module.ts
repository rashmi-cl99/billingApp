import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { usersRouting } from "./routes/users-routing.module";
import { UserListComponent } from "./components/user-list/user-list.component";
import { AvatarModule } from "ngx-avatar";
import { AddOrEditUserComponent } from "./components/add-or-edit-user/add-or-edit-user.component";

@NgModule({
  declarations: [AddOrEditUserComponent, UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    usersRouting,
    HttpClientModule,
    SharedModule,
    AvatarModule
  ],
  entryComponents: [AddOrEditUserComponent]
})
export class UsersModule {}
