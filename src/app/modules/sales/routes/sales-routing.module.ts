import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesComponent } from '../components/sales/sales.component';
import { BillGenerationComponent } from '../components/bill-generation/bill-generation.component';
import { ReportComponent } from '../components/report/report.component';


const routes: Routes = [
  {
    path: "",
    component: SalesComponent
  },
  {
    path: "bill",
    component: BillGenerationComponent
  },
  {
    path: "report",
    component: ReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class salesRouting {}
