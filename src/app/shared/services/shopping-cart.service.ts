import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'; 
import 'rxjs/add/operator/map'; 
import { ProgramDataService } from './program-data.service';
import { Subscriber } from 'rxjs/Subscriber';
import { Observer } from 'firebase/app';

@Injectable()
export class ShoppingCartService {
  _isAddExtraItem$;
  canAddExtraItem:boolean;
  idExstra:string;
  isAdded:boolean= false;


  constructor(private db: AngularFireDatabase, private progData:ProgramDataService) { 
    this.idExstra = this.progData.idExtraToPrograme;
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) { 
    console.log('in add to cart product = ' , product)
    
    let isId:number = product.imageUrl.indexOf(this.progData.idExtraToPrograme);
      if(this.progData.isInPrograme  && isId !== -1){
        this.updateItem(product, 1);
      }
      else if (isId !== -1) {
        let  sub = this.progData.changeIsOkToAddExstraItem
        this.progData.changeAddExtraItem.next(true);
        this._isAddExtraItem$ = sub.take(1).subscribe((value ) =>{
          console.log('----- sub.subscribe((value )add to cart--------')
          console.log(value)
          this.isAdded = value;
          if (this.isAdded){
            this.updateItem(product, 1);
            this.progData.updateExrtaSum(product.price)
            return;
          }
          sub.unsubscribe()
        })
      }
      else{
        this.updateItem(product, 1);
      }
  }

  async removeFromCart(product: Product) {
    // console.log("removeFromCart ",product.imageUrl + 'this.progData.isOverLimit', this.progData.isOverLimit)
    this.updateItem(product, -1);
  }

  async clearCart() { 
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }
  

  private create() { 
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> { 
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId; 

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({ 
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }
  // checkExstraItem():boolean{
  //   // console.log(' cart service before this.progData.isOkToAddExstraItem == ' ,this.progData.isOkToAddExstraItem)

  //   //  if (!this.progData.isOkToAddExstraItem){
  //     //  console.log(' cart service in if this.progData.isOkToAddExstraItem == ' ,this.progData.isOkToAddExstraItem)
  //     // this.progData.checkAddExtraItem()
      
  //     this.progData.changeAddExtraItem.subscribe((res) => {
  //       // if(res){
  //         this.canAddExtraItem = res
  //       //  }
  //     })
  //   // }
  //   return this.canAddExtraItem;
  //  }
}
