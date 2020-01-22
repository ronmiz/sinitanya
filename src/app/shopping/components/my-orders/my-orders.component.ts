import { AuthService } from 'shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  myOrders;
  totalOrdersSum:number;
  totalNumOfOrders:number;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

    this.orders$ = authService.user$.switchMap(u =>  orderService.getOrdersByUser(u.uid) )
    this.myOrders = this.orders$.subscribe((order )  =>{
      let sum:number = 0;
      let OrderCount:number = 0;
      for(let i =0 ;  i < order.length ; i++){
        sum = sum + parseInt( order[i].totalOrderPrice)
        this.totalOrdersSum =  sum;
        OrderCount++
        this.totalNumOfOrders = OrderCount;
      }
    });
  }
}
