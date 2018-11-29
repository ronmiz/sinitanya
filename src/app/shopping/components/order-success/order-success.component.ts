import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private route:ActivatedRoute,private orderService:OrderService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let orderId= params;
      //console.log(' ------- OrderSuccessComponent orderId' ,orderId)
      //console.log(orderId["id"]);
      let Id = orderId["id"];
      this.orderService.updateOrderSuccess(Id);
    });
  }

}
