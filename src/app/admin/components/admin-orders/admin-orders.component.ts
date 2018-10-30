import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;
  allOrders;
  totalOrdersSum:number ;
  totalNumOfOrders:number;

  constructor(private orderService: OrderService) { 
    this.orders$ = orderService.getOrders();

    // this.orders$ = authService.user$.switchMap(u =>  orderService.getOrdersByUser(u.uid) )
    this.allOrders = this.orders$.subscribe((order )  =>{
      let sum:number = 0;
      let OrderCount:number = 0;
      
      this.totalNumOfOrders = order.length
      for(let i =0 ;  i < order.length ; i++){
        if(order[i].totalOrderPrice !== undefined){
        sum = sum + parseInt( order[i].totalOrderPrice)
        console.log('-------------- MyOrdersComponent -------- (order[i].totalOrderPrice)')
        console.log(order[i].totalOrderPrice)
        console.log('-------------- MyOrdersComponent -------- sum')
      console.log(sum)
        this.totalOrdersSum =  sum;
        }
        // OrderCount++
        // this.totalNumOfOrders = OrderCount;
      }
    });
  }
}
