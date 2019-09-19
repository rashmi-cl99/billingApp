import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  OnDestroy
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/users.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddOrEditUserComponent } from "../add-or-edit-user/add-or-edit-user.component";
import { Subscription } from "rxjs";

export interface DialogData {
  user: any;
  id: any;
  animal: "panda" | "unicorn" | "lion";
}

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit, OnDestroy {
  user: any;
  searchTerm: any;
  userList = [];
  filteredUsers = [];

  constructor(
    private usersService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private changeDetect: ChangeDetectorRef
  ) {}

  private usersListSubscription: Subscription;

  ngOnInit() {
    //service integration to get user list
    this.usersService.getUsers().subscribe(res => {
      console.log("ressssssssss", res);
      this.userList = res;
    });
    this.usersListSubscription = this.usersService.usersListSubscription.subscribe(
      res => {
        this.userList = res;
        this.filteredUsers = res;
      }
    );
  }

  ngOnDestroy() {
    this.usersListSubscription.unsubscribe();
  }
  //this method is used to navigate to adduser page
  btnClick = function() {
    this.router.navigate(["/users/add-user"]);
  };

  //this method is used to navigate to edit user details page
  editdetails(id) {
    this.router.navigate([`/users/edit-user/${id}`]);
  }

  //this method is used to get user status detail isactive or not
  statusdetail(id, is_active) {
    const fd = {
      is_active: is_active === true ? 0 : 1
      // is_active:is_active=0
    };

    //this is used for service integration
    this.usersService.statusdetail(id, fd).subscribe(res => {
      {
        console.log("success response", res);
        this.usersService.getUsers();
        this.usersListSubscription = this.usersService.usersListSubscription.subscribe(
          res => {
            console.log("ressssssssss", res);
            this.userList = res;
          }
        );
        this.usersService.getUsers().subscribe(res => {});
      }
      error => {
        console.log("error response", error);
      };
    });
  }
  addDialog() {
    const dialogRef = this.dialog.open(AddOrEditUserComponent, {
      data: {
        type: "Add User"
      },
      disableClose: false,
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editDialog(user) {
    const dialogRef = this.dialog.open(AddOrEditUserComponent, {
      data: {
        type: "Edit User",
        user: user
      },
      disableClose: false,
      hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  search(): void {
    let term = this.searchTerm;
    this.filteredUsers = this.userList.filter(function(tag) {
      return tag.name.indexOf(term) >= 0;
    });
  }
}
