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
          itemdescription:`name:${data.shopliquor.liquor.name} 
                           rate:${data.shopliquor.liquor.rate}`,
          openingquantity:`${data.shopliquor.opening_quantity}`,
          purchase:`${data.shopliquor.shop_inventory[0].purchase_quantity}`,
          sales:`${data.cash_sell}`,
          closing:`${data.shopliquor.opening_quantity+data.shopliquor.shop_inventory[0].purchase_quantity-data.cash_sell}`,
          discount_rate:`${data.discount_rate}`,
          total:`${data.shopliquor.liquor.rate*data.cash_sell}`
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
      let pos1 = Number(data.shopposmachine.pos_machine == 1 ? `${data.discount_rate*data.quantity}` : 0);
      let pos2 = Number(data.shopposmachine.pos_machine !== 1 ? `${data.discount_rate*data.quantity}` : 0);
      return{
        id:`${data.id}`,
        itemdescription:`Name:${data.shopliquor.liquor.name} 
                         Rate:${data.shopliquor.liquor.rate} `,
        quantity:`${data.quantity}`,
        discount_rate:`${data.discount_rate}`,
        pos1:data.shopposmachine.pos_machine == 1 ? `${data.discount_rate*data.quantity}` : 0 ,
        pos2:data.shopposmachine.pos_machine !== 1 ? `${data.discount_rate*data.quantity}` : 0,
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
