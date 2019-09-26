import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SalesComponent } from '../components/sales/sales.component';
import { BillGenerationComponent } from '../components/bill-generation/bill-generation.component';
import { ReportComponent } from '../components/report/report.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: SalesComponent,
    canActivate: [AuthGuard ],
  },
  {
    path: "bill",
    component: BillGenerationComponent,
    canActivate: [AuthGuard ],
  },
  {
    path: "report",
    component: ReportComponent,
    canActivate: [AuthGuard ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class salesRouting {}
