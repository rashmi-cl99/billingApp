import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { BehaviorSubject } from "rxjs";
import { SalesService } from "../../services/sales.service";

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
  shopSelected = null;
  dateSelected = new Date();
  categoriesData = [];
  categorySelected = null;
  salesData = [];
  maxDate = new Date();
  constructor(
    private changeDetect: ChangeDetectorRef,
    private salesService: SalesService
  ) {}
  ngOnInit() {
    this.salesService.getStoreData().subscribe(res => {
      this.shops = res;
    });
    this.categorynameform = new FormGroup({});
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

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickGetCategory() {
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
    this.salesService.getCategoryList(fd).subscribe(res => {
      this.categoriesData = res;
    });
  }

  getReformatData(res) {
    let returnData = res.map((liquor, i) => {
      const totalCash = liquor.cash + this.getPosValue(liquor.posmachine);
      return {
        index: i + 1,
        ...liquor,
        totalCash: totalCash,
        total: (totalCash * liquor.INR).toFixed(),
        total_amount: (totalCash * liquor.INR - liquor.discount).toFixed(),
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
      console.log("response of sales DAta", res);
      this.salesData = this.getReformatData(res.data);
      this.editRowID = res.sales_data_available ? "" : null;
      this.dataSource.next([...this.salesData]);
    });
  }

  onChangeSalesQuantity(element) {
    console.log("onChangeSalesQuantity", element);
    const totalCash = element.cash + this.getPosValue(element.posmachine);

    element.totalCash = totalCash;
    element.total = (totalCash * element.INR).toFixed();
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
    console.log("onChangeDiscount", element);

    element.total_amount = (element.total - element.discount).toFixed();
  }

  isValidLiquor(element) {
    console.log("elementttt", element);
    const {
      cash,
      closing_quantity,
      discount,
      posmachine,
      purchase_quantity
    } = element;

    if (
      cash >= 0 &&
      cash !== null &&
      closing_quantity >= 0 &&
      closing_quantity !== null &&
      discount >= 0 &&
      discount !== null &&
      this.isPosValid(posmachine) &&
      purchase_quantity >= 0 &&
      purchase_quantity !== null
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

  submitSalesData() {
    let fd = this.salesData.map((data, i) => {
      return {
        shopliquor: data.id,
        cash_sell: data.cash,
        date:
          new Date(this.dateSelected).getFullYear() +
          "-" +
          (+new Date(this.dateSelected).getMonth() + 1) +
          "-" +
          new Date(this.dateSelected).getDate(),
        discount_rate: data.discount,
        purchase_quantity: data.purchase_quantity,
        shopposmachine: data.posmachine
      };
    });
    console.log("dfsdfdsfdsf", fd);
    this.salesService.saveTableData(fd).subscribe(
      res => {
        console.log("response success", res);
      },
      error => {
        console.log("response error", error.response);
      }
    );
  }
}
