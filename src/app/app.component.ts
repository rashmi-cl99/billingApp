import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "billing-app";
  href: any;
  // dashboard: boolean;
  // header: boolean;
  // isLoggedIn: boolean;

  constructor(private router: Router) {}

  ngDoCheck() {
    this.href = this.router.url;
    // if (this.href === "/login") {
    //   this.isLoggedIn = false;
    //   this.header = false;
    // } else if (this.href === "/dashboard") {
    //   this.dashboard = false;
    //   this.header = true;
    // } else {
    // }
  }
}
