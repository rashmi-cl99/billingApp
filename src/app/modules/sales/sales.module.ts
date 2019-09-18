import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "src/app/shared/shared.module";
import { SalesComponent } from "./components/sales/sales.component";
import { salesRouting } from "./routes/sales-routing.module";

@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    salesRouting,
    HttpClientModule,
    SharedModule,
  ]
})
export class salesModule {}
