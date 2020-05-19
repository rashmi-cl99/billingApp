import { Component, OnInit } from "@angular/core";
import { SalesService } from "../../services/sales.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Router } from "@angular/router";

@Component({
  selector: "app-bill-generation",
  templateUrl: "./bill-generation.component.html",
  styleUrls: ["./bill-generation.component.scss"]
})
export class BillGenerationComponent implements OnInit {
  shops: any;
  shopSelected = null;
  getFirstData = [];
  // dateSelected = null;

  dateSelected = new Date();
  maxDateadmin = new Date();
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public invoiceShow: boolean = false;
  public invoiceData: any;
  public minDate: any;
  // public minDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay-6);
  public maxDate: Object = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay
  );
  role:any;

  typeSelected = null;
  val: any;
  link;
  token;
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
    this.salesService.getStoreData().subscribe(
      res => {
        this.shops = res;
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


  generateInvoice = function(date, shop) {

    this.val = this.dateReformat(this.dateSelected);
       this.salesService.salesDataAvailable(this.val, this.shopSelected).subscribe(
      res => {
    this.salesService.getInvoiceData(this.dateReformat(date), shop).subscribe(
      res => {
        this.invoiceShow = true;

        var total = 0;

        //Array loop
        res.data.forEach(function(val1, index) {
          val1.total = 0;
          var total = 0;
          val1.items.forEach(function(val2, i) {
            total += val2.amount;
          });

          val1.total = total;
        });

        this.invoiceData = res;

        //this.shops = res;
      },
      error => {
        this.invoiceShow = false;
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
         },
         error => {
           this.invoiceShow = false;
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
         })
  };

  // forms() {
  //   this.router.navigate(["sales/form"]);
  // }

  dateReformat(dateSelected) {
    const mon = new Date(dateSelected).getMonth();
    const month = Number(mon) + 1;
    const val =
      new Date(dateSelected).getFullYear() +
      "-" +
      (month >= 10 ? month : "0" + month) +
      "-" +
      (new Date(dateSelected).getDate() >= 10
        ? new Date(dateSelected).getDate()
        : "0" + new Date(dateSelected).getDate());
    return val;
  }

  // onClickGetCategory() {

  //   console.log("date", this.val);
  // }
  onsubmit() {
    // console.log(
    //   "shopSelectedshopSelectedshopSelected",
    //   this.shopSelected,
    //   new Date(this.dateSelected).getFullYear() +
    //     "-" +
    //     new Date(this.dateSelected).getMonth() +
    //     "-" +
    //     new Date(this.dateSelected).getDate()
    // );
    // const mon = new Date(this.dateSelected).getMonth();
    // console.log("month:", Number(mon) + 1);
    // const month = Number(mon) + 1;

    this.val = this.dateReformat(this.dateSelected);
    // new Date(this.dateSelected).getFullYear() +
    //   "-" +
    //   month +
    //   "-" +
    //   new Date(this.dateSelected).getDate();
    // window.open(
    //     `http://18.223.131.212/api/export/${this.val}/${this.shopSelected}/`,
    //     "_blank"
    //   );

    this.salesService.salesDataAvailable(this.val, this.shopSelected).subscribe(
      res => {
        console.log("bill generation success", res);

        window.open(
          `http://18.223.131.212/export/${this.val}/${this.shopSelected}/`,
          "_blank"
        );
      },
      error => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(["/login"]);
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.error.error || error.error.detail
          });
        }
      }
    );
    //     error=>
    //   {
    //     Swal.fire({ type: 'success'});
    // })
  }
}
