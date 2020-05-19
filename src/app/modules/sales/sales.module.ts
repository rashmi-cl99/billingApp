import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { SalesComponent } from "./components/sales/sales.component";
import { salesRouting } from "./routes/sales-routing.module";
import { BillGenerationComponent } from "./components/bill-generation/bill-generation.component";
import { ReportComponent } from "./components/report/report.component";
import { InvoiceComponent } from "./components/invoice/invoice.component";

@NgModule({
  declarations: [
    SalesComponent,
    BillGenerationComponent,
    ReportComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    salesRouting,
    HttpClientModule,
    SharedModule
  ]
})
export class salesModule {}
