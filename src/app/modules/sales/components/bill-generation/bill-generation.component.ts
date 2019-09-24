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
  
  constructor(private salesService:SalesService) { }

  ngOnInit() {
    this.salesService.getStoreData().subscribe(res => {
      this.shops = res;
    });

  }

  onsubmit()
  {
    this.salesService.genratebill().subscribe(res => {
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
