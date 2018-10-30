import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ProgramDataService } from './../../services/program-data.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 

  constructor(private cartService: ShoppingCartService,private programDataService :ProgramDataService) { }

  addToCart() {
    console.log('ProductCardComponent :: addToCart() shoppingCart')
      this.cartService.addToCart(this.product);
      this.updateTotalPrice();
  }
  updateTotalPrice(){
    this.programDataService.updateTotalSum(this.shoppingCart.totalPrice);
  }
}
