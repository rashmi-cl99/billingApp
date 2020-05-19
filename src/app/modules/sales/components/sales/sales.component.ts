import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { BehaviorSubject } from "rxjs";
import { SalesService } from "../../services/sales.service";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { Router } from "@angular/router";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"]
})
export class SalesComponent implements OnInit {
  TableData: any = [];
  editRowID: any = "";
  itemdescription = [];
  categorynameform: FormGroup;
  dataSource = new BehaviorSubject([]);
  shops = [];
  getFirstData = [];
  shopSelected = null;
  dateSelected = new Date();
  categoriesData = [];
  categorySelected = null;
  salesData = [];
  billgenerate: boolean = true;
  role;
  isEditDisable: boolean = false;
  maxDateadmin = new Date();
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: any;
  // public minDate: Object = new Date(
  //   this.currentYear,
  //   this.currentMonth,
  //   this.currentDay - 3
  // );
  public maxDate: Object = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay
  );

  totalSales:any;

  constructor(
    private changeDetect: ChangeDetectorRef,
    private salesService: SalesService,
    private router: Router
  ) {}
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
    this.categorynameform = new FormGroup({});
    this.role = localStorage.getItem("role");
  }
  displayedColumns: string[] = [
    "id",
    "itemdescription",
    "sales",
    "closing_quantity",
    "amount",
    "purchase",
    "action"
  ];

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

  onClickGetCategory(categoryId) {
    this.categorySelected = null;

    const fd = {
      shop: this.shopSelected,
      date:
        new Date(this.dateSelected).getFullYear() +
        "-" +
        (+new Date(this.dateSelected).getMonth() + 1) +
        "-" +
        new Date(this.dateSelected).getDate()
    };
    this.salesService.getCategoryList(fd).subscribe(
      res => {
        this.categoriesData = res;
        const cid = categoryId ? categoryId : this.categoriesData[0].id;
        this.onClickCategory(cid);
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

  getReformatData(res) {
    // console.log("reformateddata", res);
    let returnData = res.map((liquor, i) => {
      const totalCash = liquor.cash + this.getPosValue(liquor.posmachine);
      const opening_quantity = liquor.opening_quantity;
      const closing_quantity = liquor.closing_quantity;
      return {
        index: i + 1,
        ...liquor,
        totalCash: totalCash,
        total: totalCash * liquor.rate,
        // total_amount:( totalCash * liquor.rate - liquor.total_discount).toFixed(),
        total_discount: totalCash * liquor.discount,
        total_amount: totalCash * liquor.rate - totalCash * liquor.discount,

        opening_quantity: opening_quantity,
        // changes
        // closing_quantity:opening_quantity,
        closing_quantity:
          opening_quantity + liquor.purchase_quantity - totalCash,
        action: ""
      };
    });
    return returnData;
  }

  onClickCategory(id) {
    this.categorySelected = id;

    const fd = {
      shop: this.shopSelected,
      date:
        new Date(this.dateSelected).getFullYear() +
        "-" +
        (+new Date(this.dateSelected).getMonth() + 1) +
        "-" +
        new Date(this.dateSelected).getDate(),
      category: id
    };
    this.salesService.getLiquorList(fd).subscribe(res => {

      this.totalSales = res.total_sales_amount;
      // to disable action column when searched with previous date.
      this.isEditDisable =
        // new Date(this.dateSelected).getFullYear() +
        //   "-" +
        //   (+new Date(this.dateSelected).getMonth() + 1) +
        //   "-" +
        //   new Date(this.dateSelected).getDate()
        new Date(this.dateSelected).getFullYear() +
          "-" +
          (new Date(this.dateSelected).getMonth() + 1 >= 10
            ? new Date(this.dateSelected).getMonth() + 1
            : "0" + (new Date(this.dateSelected).getMonth() + 1)) +
          "-" +
          (new Date(this.dateSelected).getDate() >= 10
            ? new Date(this.dateSelected).getDate()
            : "0" + new Date(this.dateSelected).getDate()) <
        res.last_date_sales;

      // console.log("response of sales DAta", res);

      this.salesData = this.getReformatData(res.data);

      this.editRowID = res.sales_data_available ? "" : null;
      this.dataSource.next([...this.salesData]);
      this.billgenerate = res.bill_generated;
    });
  }

  onChangeSalesQuantity(element) {
    // console.log("onChangeSalesQuantity", element);
    const totalCash = element.cash + this.getPosValue(element.posmachine);
    const closing_quantity =
      element.opening_quantity +
      element.purchase_quantity -
      (element.cash + this.getPosValue(element.posmachine));
    element.closing_quantity = closing_quantity;
    element.totalCash = totalCash;
    element.total_discount = element.totalCash * element.discount;
    element.total = totalCash * element.rate;

    this.onChangeDiscount(element);
  }

  getPosValue(element) {
    let posTotal = 0;
    element.map(posElement => {
      posTotal += posElement.quantity;
    });

    return posTotal;
  }

  onChangeDiscount(element) {
    // console.log("onChangeDiscount", element);
    element.total_discount = element.totalCash * element.discount;
    element.total_amount = element.total - element.total_discount;
  }

  isValidLiquor(element) {
    // console.log("elementttt", element);
    const {
      cash,
      closing_quantity,
      discount,
      total_discount,
      posmachine,
      purchase_quantity,
      total,
      total_amount
    } = element;

    if (
      cash >= 0 &&
      cash !== null &&
      discount >= 0 &&
      discount !== null &&
      this.isPosValid(posmachine) &&
      purchase_quantity >= 0 &&
      purchase_quantity !== null &&
      total >= discount &&
      total >= total_discount
    ) {
      return false;
    } else {
      return true;
    }
  }

  isPosValid(posmachine) {
    let valid = -1;
    posmachine.map((pos, i) => {
      if (pos.quantity < 0 || pos.quantity === null) {
        valid = 0;
      }
    });
    return valid === -1 ? true : false;
  }

  isValidTable() {
    let valid = -1;
    if (this.salesData.length > 0) {
      this.salesData.map((data, i) => {
        if (this.isValidLiquor(data)) {
          valid = 0;
        }
      });
    }
    return valid === -1 ? false : true;
  }

  // input field should not accept decimal numbers
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submitSalesData() {
    let fd = this.salesData.map((data, i) => {
      return {
        shopliquor: data.id,
        cash_sell: data.cash,
        date:
          new Date(this.dateSelected).getFullYear() +
          "-" +
          (new Date(this.dateSelected).getMonth() + 1 >= 10
            ? new Date(this.dateSelected).getMonth() + 1
            : "0" + (new Date(this.dateSelected).getMonth() + 1)) +
          "-" +
          (new Date(this.dateSelected).getDate() >= 10
            ? new Date(this.dateSelected).getDate()
            : "0" + new Date(this.dateSelected).getDate()),
        discount_rate: data.discount,
        purchase_quantity: data.purchase_quantity,
        shopposmachine: data.posmachine,
        opening_quantity: data.opening_quantity,
        closing_quantity: data.closing_quantity
      };
    });

    if (
      fd[0].cash_sell == 0 &&
      fd[0].discount_rate == 0 &&
      fd[0].purchase_quantity == 0 &&
      fd[0].shopposmachine[0].quantity === 0
    ) {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to submit zero",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "No, cancel!",
        cancelButtonColor: "#d33"
      }).then(result => {
        if (result.value) {
          this.saveTable(fd);
        } else {
          //this.onClickCategory(this.categorySelected);
          //this.onClickGetCategory(this.categorySelected);
        }
      });
    } else {
      this.saveTable(fd);
    }
  }

  saveTable(fd) {
    this.salesService.saveTableData(fd).subscribe(
      res => {
        Swal.fire({
          type: "success",
          text: res.success
        });
        //this.onClickCategory(this.categorySelected);
        this.onClickGetCategory(this.categorySelected);
      },
      error => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(["/login"]);
        } else {
          //  To change the value of closed quantity without referesh
          this.onClickGetCategory(this.categorySelected);

          Swal.fire({
            type: "error",
            title: "Oops...",
            text: error.error.error || error.error.closing_quantity
          });
        }
      }
    );
  }

  updateData(element) {
    // console.log("elemendasdt", this.editRowID == element.id);
    this.editRowID = this.editRowID == element.id ? "" : element.id;
    const fd = {
      cash_sell: element.cash,
      discount_rate: element.discount,
      opening_quantity: element.opening_quantity,
      purchase_quantity: element.purchase_quantity,
      closing_quantity: element.closing_quantity,
      shopposmachine: JSON.stringify(element.posmachine)
    };
    if (this.editRowID !== element.id) {
      // console.log("call update api", element.id);
      const val = {
        date:
          new Date(this.dateSelected).getFullYear() +
          "-" +
          (new Date(this.dateSelected).getMonth() + 1 >= 10
            ? new Date(this.dateSelected).getMonth() + 1
            : "0" + (new Date(this.dateSelected).getMonth() + 1)) +
          "-" +
          (new Date(this.dateSelected).getDate() >= 10
            ? new Date(this.dateSelected).getDate()
            : "0" + new Date(this.dateSelected).getDate())
      };
      this.salesService.updateSalesdata(val, element.id, fd).subscribe(
        res => {
          Swal.fire({
            type: "success",
            text: res.success
          });
        },
        error => {
          if (error.status === 401) {
            localStorage.clear();
            this.router.navigate(["/login"]);
          } else {
            Swal.fire({
              type: "error",
              title: "Oops...",
              text: error.error.error || error.error.closing_quantity
            });
            this.onClickCategory(this.categorySelected);
          }
        }
      );
    }
  }
}
