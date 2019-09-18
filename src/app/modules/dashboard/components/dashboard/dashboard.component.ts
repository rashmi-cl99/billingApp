import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  sales: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H",sales:19.21},
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He",sales:19.21},
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li",sales:19.21},
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be",sales:19.21 },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B",sales:19.21 },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C",sales:19.21 },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N",sales:19.21 },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O",sales:19.21 },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F",sales:19.21 },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne",sales:19.21 }
];

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ["position", "name", "weight", "symbol","sales"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  options = [
    {
      link: "",
      name: "Manage Users",
      icon: "person_outline"
    },
    {
      link: "",
      name: "Record Sales",
      icon: "person_outline"
    },
    {
      link: "",
      name: "Generate Bills",
      icon: "person_outline"
    },
    {
      link: "",
      name: "Generate Reports",
      icon: "person_outline"
    }
  ];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
