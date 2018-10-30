import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from "../../../shared/models/order";
import { WorkersService } from 'shared/services/workers.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {}; 
  workersId:string;
  userSubscription: Subscription;
  userId: string;
  workers$
  linkStr:string;
  priceToPay:number;
  orderID:string;
  workderNameInfo:string;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private workersService:WorkersService,
    private shoppingCartService:ShoppingCartService) {
  }

  ngOnInit() {
    this.workers$ = this.workersService.getAll();
    console.log('----------ShippingFormComponent this.workers$--------------------')
    console.log(this.workers$)
    this.priceToPay = this.shoppingCartService.priceToPay()
    // this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

  }

  ngOnDestroy() { 
    // this.userSubscription.unsubscribe();
  }

  async placeOrder(f) {
    console.log('---------- this.workers ----------------');
    console.log(f.value)
    this.userId = f.value.workers
    console.log(this.workersId)
    this.workersService.getUserInfo(this.userId).subscribe((res) => {
        this.workderNameInfo = (res["firstName"] + " " + res["lastName"] + " " + res["city"])
        console.log( this.workderNameInfo )
    })

    let order = new Order(this.workderNameInfo,this.priceToPay,this.userId,this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.orderID = result.key;
    console.log('-------------- await this.orderService.placeOrder(order) result----------------------')
    console.log(result.key)
    this.linkStr = `https://www.matara.pro/nedarimplus/online/?mosad=0&Amount=${this.priceToPay}&AmountLock=1&Analytic=${this.orderID}&Redirect=www.sinitanya.co.il/order-success/${this.orderID}`
    
    // this.linkStr = `https://www.matara.pro/nedarimplus/online/?mosad=7000746&Amount=${this.priceToPay}&AmountLock=1&Analytic=${this.orderID}&Redirect=www.sinitanya.co.il/order-success/${this.orderID}`
    window.location.href =  this.linkStr;
    //window.open(this.linkStr , "_blank");
     //this.router.navigate(['/order-success', result.key]);
    // this.linkStr = `iframe.php?sum=${this.getGlobalInfo()}&lang=heb&nologo=1&currency=1&cred_type=1&contact= ${this.userData}&email= ${this.userEmail}`;   
  }    
}
