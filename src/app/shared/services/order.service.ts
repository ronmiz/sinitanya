import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { UserInfoService } from 'shared/services/user-info.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService,
    private userInfoService: UserInfoService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersBySuccess() {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'ordersSuccess',
        equalTo: true
      }
    });
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'workerId',
        equalTo: userId
      }
    });
  }

  updateOrderSuccess(orderId) {
    this.db.list('/orders').update(orderId, { 'ordersSuccess': true });
    let orderInfo = this.getOrderById(orderId).subscribe((info) => {
      let orderWorkerId: string = info['workerId'];
      let orderTotalPrice: number = parseInt(info['totalPriceOrder']);
      this.userInfoService.updateUserInfoOrder(orderWorkerId, orderTotalPrice)
    });
  }
  
  getOrderById(orderId) {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'orderId',
        equalTo: orderId
      }
    });

  }
}
