import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'; 
import 'rxjs/add/operator/map'; 
import { ProgramDataService } from './program-data.service';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ShoppingCartService {
  _isAddExtraItem$;
  _isAddExtraAllItem$;
  canAddExtraItem:boolean;
  idExstra:string;

  isAdded:boolean= false;
  isOkToAddAllExtra:boolean= false;
  countExtraAllItem:number = 0 ;

  products: Product[];
  subscription: Subscription;
  public cureentCart:ShoppingCart;
  public totalPriceToPay:number;


  constructor(private db: AngularFireDatabase, 
    private progData:ProgramDataService,
    private productsService :ProductService) { 
    this.idExstra = this.progData.idExtraToPrograme;
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x =>this.cureentCart = new ShoppingCart(x.items) );  
  }

  async addToCart(product: Product) { 
    let isIdAll30:number = product.imageUrl.indexOf(this.progData.idExtraItemAll30 );
    let isIdAll50:number = product.imageUrl.indexOf(this.progData.idExtraItemAll50 );
    let isId:number = product.imageUrl.indexOf(this.progData.idExtraToPrograme);
  
    if(isIdAll30 !== -1 || isIdAll50 !== -1)   { 
      let  sub = this.progData.changeIsOkToAddAllExtraItem
      
      this.progData.checkAddAllExtraItem.next(true);
      this._isAddExtraAllItem$ = sub.take(1).subscribe((value ) =>{
        this.isOkToAddAllExtra = value;
        if (this.isOkToAddAllExtra){
          this.updateItem(product, 1);
           this.progData.updateExrtaSumAll(product.price)
          return;
        }
      });
    }else  if(this.progData.isInPrograme  && isId !== -1){
      this.updateItem(product, 1);
      }
      else if (isId !== -1) {
        let  sub = this.progData.changeIsOkToAddExstraItem
        this.progData.changeAddExtraItem.next(true);
        this._isAddExtraItem$ = sub.take(1).subscribe((value ) =>{
          this.isAdded = value;
          if (this.isAdded){
            this.updateItem(product, 1);
            this.progData.updateExrtaSum(product.price)
            return;
          }
        })
      }
      else{
        this.updateItem(product, 1);
      }
  }

  async removeFromCart(product: Product) {
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

  addAllProducts(quantity){
    this.getOrCreateCartId()
    this.subscription = this.productsService.getAll()
    .subscribe(products => {
      this.products = products;
      for(let i = 0; i <= this.products.length;i++){
        let imageId:string = this.products[i].imageUrl;
        let isIdAll30:number = imageId.indexOf(this.progData.idExtraItemAll30 );
        let isIdAll50:number = imageId.indexOf(this.progData.idExtraItemAll50 );
        let isIdExtra:number = imageId.indexOf(this.progData.idExtraToPrograme );
        let isIdEmpty:number = imageId.indexOf("51");
        if(isIdAll30 !== -1 || isIdAll50 !== -1 || isIdEmpty !== -1){

        }else {
            this.updateItem(this.products[i],quantity)
          }
        }
    });
  }
  priceToPay():number{
    //console.log(' priceToPay() this.progData.programName : ');
    //console.log(this.progData.programName);
    if (this.progData.programName === '6'){
      //console.log(' ----- programe name is 6')
      return Number(this.cureentCart.totalPrice);
    }
    let progPrice:number = Number(this.progData.programPrice);
    let progLimit:number = Number(this.progData.programLimit);
    let sumExstra:number = (this.progData.extraSum)as number;
    let sumExstraAll:number = (this.progData.totalExtraItemAll)as number;
    let totalToPay:number;
    //console.log('-------- ShoppingCartService -----------');
    //console.log('progPrice : ' , progPrice , ' progLimit:' ,progLimit, ' sumExstra:' , sumExstra , ' sumExstraAll  : ' ,sumExstraAll)
    if(this.cureentCart.totalPrice < progLimit){
      totalToPay = progPrice + sumExstraAll + sumExstra
      return totalToPay;
    }
    if( this.cureentCart.totalPrice > progLimit) {
       let overPriceProgToPay:number = this.cureentCart.totalPrice - progLimit -  sumExstraAll - sumExstra
      totalToPay = progPrice + overPriceProgToPay + sumExstraAll + sumExstra
      return totalToPay;
     }

    else{
      totalToPay = progPrice;
    }
    return totalToPay;
  }
}
