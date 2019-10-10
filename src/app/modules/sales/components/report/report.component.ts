import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  shops:any;
  val:any;
  shopSelected = null;
  dateSelected = null;
  typeSelected = null;
  types:string[]=["cash","pos"];
  //cash table column
  displayedColumns: string[] = [
    "id",
    "itemdescription",
    "openingquantity",
    "purchase",
    "sales",
    "closing",
    "discount_rate",
    "total",
  ];
  //pos table column
  displayedColumnspos: string[] = [
    "id",
    "itemdescription",
    "quantity",
    "discount_rate",
    "pos1",
    "pos2",
    "total",
  ];
  dataSource: MatTableDataSource<Element[]>; //cash table
  dataSourcepos: MatTableDataSource<Element[]>;//pos table

  constructor(private salesService:SalesService) { }

  ngOnInit() {
    this.salesService.getShops().subscribe(res => {
      console.log("shop got", res);
      this.shops = res;
    });
  }

  onClickGetCategory() {
    console.log(
      "shopSelectedshopSelectedshopSelected",
      this.shopSelected,
        new Date(this.dateSelected).getFullYear() +
        "-" +
        new Date(this.dateSelected).getMonth() +
        "-" +
        new Date(this.dateSelected).getDate()
      );
      const mon=new Date(this.dateSelected).getMonth();
      console.log("month:",Number(mon)+1);
      const month=Number(mon)+1

      this.val= new Date(this.dateSelected).getFullYear() +
      "-" +
      month+
      "-" +
      new  Date(this.dateSelected).getDate();
      console.log("date",this.val);

     
  }
  
  onSubmit()
  {
    //cash
    if(this.typeSelected === 'cash')
    {
    this.salesService.reportGenrateCash(this.val,this.shopSelected).subscribe(res => {
      console.log("report cash got", res);
      const reformatData=res.map((data)=>{
        return{
          id:`${data.id}`,
          itemdescription:`${data.Item_Name} `,
          openingquantity:`${data.Opening_quantity}`,
          purchase:`${data.Purchase_quantity}`,
          sales:`${data.Sales}`,
          closing:`${data.Closing_quantity}`,
          discount_rate:`${data.Discount}`,
          total:`${data.Total}`
        };
      });
      console.log("result", reformatData);
        this.dataSource = new MatTableDataSource(reformatData);
    },
    error=>
    {
      console.log("report error", error);
    });
  }
 
  //pos
  this.salesService.reportGenratePos(this.val,this.shopSelected).subscribe(res => {
    console.log("report pos got", res);
    const reformatDatapos=res.map((data)=>{
      let pos1 = Number(data.posmachine == 1 ? `${data.Discount*data.Quantity}` : 0);
      let pos2 = Number(data.posmachine !== 1 ? `${data.Discount*data.Quantity}` : 0);
      return{
        id:`${data.id}`,
        itemdescription:`${data.Item_Name}`,
        quantity:`${data.posmachine[0].Quantity1}`,
        discount_rate:`${data.Discount}`,
        pos1:data.posmachine[0].POS == 'Pos1' ? `${data.posmachine[0].Amount1}` : 0 ,
        pos2:data.posmachine[0].POS !== 'Pos1' ? `${data.posmachine[0].Amount2}` : 0,
        total:`${pos1+pos2}`,
      };
    });
    console.log("result",reformatDatapos);
    this.dataSourcepos = new MatTableDataSource(reformatDatapos);
  },
  error=>
  {
    console.log("report error", error);
  });
}

}
