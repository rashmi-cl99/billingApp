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
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
  user: any;
  id: any;
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
  filteredUsers = null;

  constructor(
    private usersService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private changeDetect: ChangeDetectorRef,
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
    this.usersService.statusdetail(id, fd).subscribe(respo => {
      {
        Swal.fire({type:'success',text:respo.success});
        this.usersService.getUsers();
        this.usersListSubscription = this.usersService.usersListSubscription.subscribe(
          resp => {
            console.log("enable",resp);
            this.userList = resp;
                }
        );
        this.usersService.getUsers().subscribe(res => {});
      }
      error => {
                    Swal.fire({type:'error',text:error.error});
               };
    });
  }
  addDialog() {
    this.searchTerm = "";
    const dialogRef = this.dialog.open(AddOrEditUserComponent, {
      data: {
        type: "Add User"
      },
      disableClose: false,
      // hasBackdrop: false
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
      // hasBackdrop: false
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  search(): void {
    let term = this.searchTerm;
    this.filteredUsers = this.userList.filter(function(tag) {
      // return tag.name.toLowerCase().indexOf(term) != -1  || tag.name.indexOf(term) != -1 || tag.name.toUpperCase().indexOf(term) != -1  ;
      return tag.name.toLowerCase().indexOf(term.toLowerCase()) != -1;
    });
  }

}
