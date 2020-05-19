import { Component, OnInit } from "@angular/core";
import { SalesService } from "../../services/sales.service";
import { MatTableDataSource } from "@angular/material";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Router } from "@angular/router";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {
  shops: any;
  val: any;
  shopSelected = null;
  getFirstData = [];
  role;
  // dateSelected = null;

  dateSelected = new Date();
  maxDateadmin = new Date();
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: any;
  // public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay-6);
  public maxDate: Object = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay
  );

  typeSelected = null;
  types: string[] = ["cash", "pos"];

  displayedColumns: string[] = [
    "id",
    "itemdescription",
    "openingquantity",
    "purchase",
    "sales",
    "closing",
    "discount_rate",
    "total"
  ];
  //pos table column
  // displayedColumnspos: string[] = [
  //   "id",
  //   "itemdescription",
  //   "discount",
  //   "quantity",
  //   "total"
  // ];
  displayedColumnspos: string[] = [
    "id",
    "itemdescription",
    "openingquantity",
    "purchase",
    "closing",
    "discount",
    "quantity",
    "total"
  ];
  dataSource: MatTableDataSource<Element[]>; //cash table
  dataSourcepos: MatTableDataSource<Element[]>; //pos table

  constructor(private salesService: SalesService, private router: Router) {}

  ngOnInit() {
    this.salesService.getFirstDate().subscribe(
      res => {
        this.getFirstData = res;
      },
      error => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(["/login"]);
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.error.detail
          });
        }
      }
    );

    //changed on jan 20th
    // this.salesService.getShops().subscribe(
      this.salesService.getStoreData().subscribe(
      res => {
        // console.log("shop got", res);
        this.shops = res;
      },
      error => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(["/login"]);
        }
      }
    );
  }

  setMinDate(shopId) {
    if (shopId) {
      let minDate = "";
      this.getFirstData.forEach(function(val, index) {
        if (val.shop_id === shopId) {
          minDate = val.first_date;
        }
      });

      this.minDate = minDate;
    }
  }
  onClickGetCategory() {
    //  console.log(
    //   "shopSelectedshopSelectedshopSelected",
    //   this.shopSelected,
    //   new Date(this.dateSelected).getFullYear() +
    //     "-" +
    //     new Date(this.dateSelected).getMonth() +
    //     "-" +
    //     new Date(this.dateSelected).getDate()
    // );
    const mon = new Date(this.dateSelected).getMonth();
    console.log("month:", Number(mon) + 1);
    const month = Number(mon) + 1;

    this.val =
      new Date(this.dateSelected).getFullYear() +
      "-" +
      month +
      "-" +
      new Date(this.dateSelected).getDate();
    console.log("date", this.val);
  }

  onSubmit() {
    //cash
    this.dataSourcepos = new MatTableDataSource([]);
    // this.dataSource = new MatTableDataSource();

    if (this.typeSelected === "cash") {
      this.dataSource = new MatTableDataSource();
      this.salesService
        .reportGenrateCash(this.val, this.shopSelected)
        .subscribe(
          res => {
            console.log("report cash got", res);
            const reformatData = res.map((data, i) => {
              return {
                id: i + 1,
                itemdescription: `${data.item_name} `,
                openingquantity: `${data.opening_quantity}`,
                purchase: `${data.purchase_quantity}`,
                sales: `${data.sales}`,
                closing: `${data.closing_quantity}`,
                discount_rate: `${data.discount}`,
                total: `${data.total}`
              };
            });
            console.log("result", reformatData);
            this.dataSource = new MatTableDataSource(reformatData);
          },
          error => {
            if (error.status === 401) {
              localStorage.clear();
              this.router.navigate(["/login"]);
            } else {
              Swal.fire({
                type: "error",
                title: "Oops...",
                text: error.error.error
              });
            }
          }
        );
    }

    //pos
    if (this.typeSelected === "pos") {
      this.dataSourcepos = new MatTableDataSource();
      this.salesService.reportGenratePos(this.val, this.shopSelected).subscribe(
        res => {
          console.log("report pos got", res);

          const fd = res.map((report, i) => {
            return {
              id: i + 1,
              openingquantity: `${report.opening_quantity}`,
              purchase: `${report.purchase_quantity}`,
              ...report,
              closing: `${report.closing_quantity}`,
              total: `${report.total_amount}`
              // total: report.posmachine.reduce((total, pos, i) => {
              //   return total + pos[`amount`];
              // }, 0)
            };
          });
          console.log("ssdfsdfsdf", fd);
          this.dataSourcepos = new MatTableDataSource(fd);
        },
        error => {
          if (error.status === 401) {
            localStorage.clear();
            this.router.navigate(["/login"]);
          } else {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: error.error.error
            });
          }
        }
      );
    }
  }
}
