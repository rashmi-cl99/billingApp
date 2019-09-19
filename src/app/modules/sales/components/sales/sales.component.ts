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
  dateSelected = null;
  categoriesData = [];
  categorySelected = null;
  salesData = [];
  constructor(
    private changeDetect: ChangeDetectorRef,
    private salesService: SalesService
  ) {}
  ngOnInit() {
    this.salesService.getStoreData().subscribe(res => {
      this.shops = res;
    });
    this.categorynameform = new FormGroup({});

    // this.userService.itemdescriptions().subscribe(
    //   res => {
    //     console.log("success response", res);
    //     this.itemdescription = res;
    //     const reformatData = res.map((data, i) => {
    //       return {
    //         itemdescription: `${data.liquor.name} - INR ${data.liquor.rate}
    //                               OpeningQuantity: ${data.opening_quantity}`
    //       };
    //     });
    //     console.log("result", reformatData);
    //     this.dataSource = new MatTableDataSource(reformatData);
    //   },
    //   error => {
    //     console.log("error", error);
    //   }
    // );
    let reformatData = {
      isCompleted: true,
      tableData: [
        {
          id: 1,
          itemdescription: [
            { name: "bira white", value: "500ml" },
            { name: "INR", value: 150 },
            { name: "opening quantity", value: "752" },
            { name: "closing quantity", value: "752" }
          ],
          sales: {
            cash: { name: "cash", value: 2 },
            pos: [{ name: "POS 1", value: 1 }, { name: "POS 2", value: 1 }]
          },
          amount: [
            { name: "total", value: null },
            { name: "discount(%)", value: 43 },
            { name: "discount", value: "" },
            { name: "total amount", value: "" }
          ],
          purchase: [{ name: "quantity", value: "20" }],
          action: ""
        }
        // {
        //   id: 2,
        //   itemdescription: [
        //     { name: "bira black", value: "500ml" },
        //     { name: "INR", value: "150" },
        //     { name: "opening quantity", value: "752" },
        //     { name: "closing quantity", value: "752" }
        //   ],
        //   sales: {
        //     cash: { name: "cash", value: "100" },
        //     pos: [
        //       { name: "POS 1", value: "123" },
        //       { name: "POS 2", value: "123" }
        //     ]
        //   },
        //   amount: [
        //     { name: "total", value: "" },
        //     { name: "discount(%)", value: "43%" },
        //     { name: "discount", value: "" },
        //     { name: "total amount", value: "" }
        //   ],
        //   purchase: [{ name: "quantity", value: "30" }],
        //   action: ""
        // },
        // {
        //   id: 3,
        //   itemdescription: [
        //     { name: "bira red", value: "500ml" },
        //     { name: "INR", value: "150" },
        //     { name: "opening quantity", value: "752" },
        //     { name: "closing quantity", value: "752" }
        //   ],
        //   sales: {
        //     cash: { name: "cash", value: "100" },
        //     pos: [
        //       { name: "POS 1", value: "123" },
        //       { name: "POS 2", value: "123" }
        //     ]
        //   },
        //   amount: [
        //     { name: "total", value: "" },
        //     { name: "discount(%)", value: "43%" },
        //     { name: "discount", value: "" },
        //     { name: "total amount", value: "" }
        //   ],
        //   purchase: [{ name: "quantity", value: "40" }],
        //   action: ""
        // }
      ]
    };
    this.salesData = reformatData.tableData;
    this.editRowID = reformatData.isCompleted ? "" : null;
    this.dataSource.next([...this.salesData]);

    this.categoriesData = [
      {
        id: 1,
        name: "Beer",
        count: 15,
        completed: true
      },
      {
        id: 2,
        name: "Brandy",
        count: 12,
        completed: false
      },
      {
        id: 3,
        name: "Gin",
        count: 15,
        completed: true
      }
    ];
  }
  displayedColumns: string[] = [
    "id",
    "itemdescription",
    "sales",
    "amount",
    "purchase",
    "action"
  ];

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangeAmount(ev) {
    console.log("evevevev", ev);
    console.log("editRowID", this.editRowID);

    this.salesData = this.salesData.map((liquor, i) => {
      if (i + 1 === this.editRowID) {
        return {
          ...liquor,
          amount: [
            { name: "total", value: ev },
            { name: "discount(%)", value: 50 },
            {
              name: "discount",
              value: ev - (liquor.amount[2].value / 100) * ev
            },
            {
              name: "total amount",
              value: (liquor.amount[2].value / 100) * ev
            }
          ]
        };
      } else {
        return { ...liquor };
      }
    });

    console.log("salesDatasalesData", this.salesData);
    // this.dataSource.next(this.salesData);
    // this.dataSource.next([...this.salesData]);
    this.changeDetect.detectChanges();
  }

  onClickGetCategory() {
    console.log(
      "shopSelectedshopSelectedshopSelected",
      this.shopSelected,
      new Date(this.dateSelected).getFullYear() +
        "-" +
        new Date(this.dateSelected).getMonth()+1 +
        "-" +
        new Date(this.dateSelected).getDate()
    );
  }

  onChangeSalesQuantity(event) {}

  submitSalesData() {}
}
