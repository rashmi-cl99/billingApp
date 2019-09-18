import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { DashboardService } from "../../services/dashboard.service";

export interface PeriodicElement {
  name: string;
  address: number;
  gst_no: number;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "address", "gst_no"];
  dataSource: MatTableDataSource<Array<any>>;
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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {

    this.dashboardService.getShopsData().subscribe(res => {
      console.log("reponse shopdata", res);
      const reformatData = res.map((shop, i) => {
        return {
          ...shop,
          id: i
        };
      });
      this.dataSource = new MatTableDataSource(reformatData);
    this.dataSource.sort = this.sort;

    });
  }
}
