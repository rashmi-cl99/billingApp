import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  role = null;
  username = null;
  constructor(private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem("role");
    this.username = localStorage.getItem("name");
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
