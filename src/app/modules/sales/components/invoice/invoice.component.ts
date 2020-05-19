import { Component, OnInit, Input } from "@angular/core";
import { SalesService } from "../../services/sales.service";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material";

import "sweetalert2/src/sweetalert2.scss";
import { Router } from "@angular/router";

// export interface PeriodicElement {
//   itemdescription: string;
//   id: number;
//   quantity: number;
//   discount: number;
//   amount: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     id: 1,
//     itemdescription: "Hydrogen",
//     quantity: 1.0079,
//     discount: 10,
//     amount: 10
//   },
//   {
//     id: 2,
//     itemdescription: "Hydrogen",
//     quantity: 1.0079,
//     discount: 10,
//     amount: 10
//   },
//   {
//     id: 3,
//     itemdescription: "Hydrogen",
//     quantity: 1.0079,
//     discount: 10,
//     amount: 10
//   },
//   {
//     id: 4,
//     itemdescription: "Hydrogen",
//     quantity: 1.0079,
//     discount: 10,
//     amount: 10
//   }
// ];

@Component({
  selector: "invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"]
})
export class InvoiceComponent implements OnInit {
  displayedColumns: string[] = ["id", "item", "quantity", "discount", "amount"];
  // dataSource = ELEMENT_DATA;
  forms: any;
  billData = [];
  dataSource: MatTableDataSource<Element[]>;

  constructor(private salesService: SalesService, private router: Router) {}

  @Input() shopname;
  @Input() selecteddate;
  @Input() invoiceData;

  ngOnInit() {
    console.log("Sales data", this.invoiceData);

    //   this.salesService.getShops().subscribe(res => {
    //     console.log("form got", res);
    //     this.forms = res;
    //   },error => {
    //     if(error.status === 401){
    //       localStorage.clear();
    //       this.router.navigate(["/login"]);
    //     }
    //   });
    // }
    // this.billData = [
    //   {
    //     billNo: 123,
    //     total: 100,
    //     data: [
    //       {
    //         id: 1,
    //         item: "abc",
    //         quantity: 2,
    //         discount: 10,
    //         amount: 100
    //       },
    //       {
    //         id: 2,
    //         item: "abc",
    //         quantity: 2,
    //         discount: 10,
    //         amount: 200
    //       }
    //     ]
    //   },
    //   {
    //     billNo: 234,
    //     total: 100,
    //     data: [
    //       {
    //         id: 13,
    //         item: "abc13",
    //         quantity: 21,
    //         discount: 30,
    //         amount: 600
    //       },
    //       {
    //         id: 22,
    //         item: "absfdc",
    //         quantity: 2,
    //         discount: 80,
    //         amount: 100
    //       }
    //     ]
    //   }
    // ];
    // this.dataSource = new MatTableDataSource(this.billData);
  }
}
