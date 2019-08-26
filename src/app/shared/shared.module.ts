import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AvatarModule } from "ngx-avatar";
import { HeaderComponent } from "../components/header/header.component";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    AvatarModule
  ],
  exports: [MaterialModule, HeaderComponent],
  providers: []
})
export class SharedModule {}
