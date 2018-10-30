import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';

import { ShoppingCart } from './../../models/shopping-cart';
import { ProgramDataService } from './../../services/program-data.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart; 

  constructor(private cartService: ShoppingCartService, private programDataService :ProgramDataService) { 
    
  }

  addToCart() {
    console.log('--- ProductQuantityComponent addTocart -- ' , this.product)
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
