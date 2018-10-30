import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  confirmResult = null;
  public priceToPay:number

  constructor(private shoppingCartService: ShoppingCartService)
{ }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    console.log('------------- shoppingCartService cureentCart----------------');
    console.log(this.shoppingCartService.cureentCart);
    // this.cart$.subscribe(x => {
    //   // if(this.isInPrograme || this.okToAddextra){
    //     this.priceToPay = x.totalPrice;

    //   // }
    //   // this.updatetotalPrice();
    // });
    this.priceToPay = Number(this.shoppingCartService.priceToPay());

  }

  clearCart() { 
  this.shoppingCartService.clearCart(); 
}
}
