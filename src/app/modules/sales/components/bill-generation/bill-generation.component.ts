import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";


@Component({
  selector: 'app-bill-generation',
  templateUrl: './bill-generation.component.html',
  styleUrls: ['./bill-generation.component.scss']
})
export class BillGenerationComponent implements OnInit {

  shops :any;
  shopSelected = null;
  dateSelected = null;
  val: any;

  constructor(private salesService:SalesService) { }

  ngOnInit() {
    this.salesService.getStoreData().subscribe(res => {
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
  onsubmit()
  {
    this.salesService.genratebill(this.shopSelected,this.dateSelected).subscribe(res => {
      Swal.fire("generatebill",res,"success");
    },
    error=>
    {
      Swal.fire("error",error);
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
    );

  }

}
