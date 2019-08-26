import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/users.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  userList = [];

  ngOnInit() {
    this.userList = this.userService.getUsers();
  }

  btnClick = function() {
    this.router.navigate(["/users/add-user"]);
  };
}
