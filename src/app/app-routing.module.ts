import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: () =>
      import("./modules/user-management/user-management.module").then(
        m => m.UserManagementModule
      )
  },
  {
    path: "users",
    loadChildren: () =>
      import("./modules/users/users.module").then(m => m.UsersModule)
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./modules/dashboard/dashboard.module").then(
        m => m.dashboardModule
      )
  },
  {
    path: "sales",
    loadChildren: () =>
      import("./modules/sales/sales.module").then(m => m.salesModule)
  },
  {
    path: "**",
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
