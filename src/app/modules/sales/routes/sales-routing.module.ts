import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesComponent } from "../components/sales/sales.component";
import { BillGenerationComponent } from "../components/bill-generation/bill-generation.component";
import { ReportComponent } from "../components/report/report.component";
import { AuthGuard } from "src/app/shared/guards/auth.guard";
import { RoleGuard } from "src/app/shared/guards/role.guard";
import { InvoiceComponent } from "../components/invoice/invoice.component";

const routes: Routes = [
  {
    path: "",
    component: SalesComponent,
    canActivate: [AuthGuard],
    data: { role: "User" }
  },
  {
    path: "bill",
    component: BillGenerationComponent,
    canActivate: [AuthGuard],
    data: { role: "Accountant" }
  },
  {
    path: "invoice",
    component: InvoiceComponent,
    canActivate: [AuthGuard],
    data: { role: "Accountant" }
  },
  {
    path: "report",
    component: ReportComponent,
    canActivate: [AuthGuard, RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class salesRouting {}
