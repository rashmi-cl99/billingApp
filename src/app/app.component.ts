import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "billing-app";
  href: any;
  // dashboard: boolean;
  // header: boolean;
  // isLoggedIn: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    // console.log("on init called");
    window.addEventListener("offline", function(e) {
      alert("Check your Internet Connection");
    });
  }

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
