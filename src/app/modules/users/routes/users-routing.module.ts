import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "../components/add-user/add-user.component";
import { EditUserComponent } from "../components/edit-user/edit-user.component";
import { UserListComponent } from "../components/user-list/user-list.component";

const routes: Routes = [
  {
    path: "",
    component: UserListComponent
  },
  {
    path: "add-user",
    component: AddUserComponent
  },
  {
    path: "edit-user/:id",
    component: EditUserComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class usersRouting {}
