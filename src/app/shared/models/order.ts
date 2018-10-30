import { ShoppingCart } from './shopping-cart';

export class Order { 
  datePlaced: number; 
  ordersSuccess:string;
  items: any[];
  _workerId: string;
  constructor(public workderNameInfo,public totalOrderPrice,public workerId:string,public shipping: any, shoppingCart: ShoppingCart) {
    // console.log('----------- order date -------------------------')
    // console.log(new Date().getDate())
    // let data = new Date().getDate()
    // let houer = (new Date().getHours())
    //  this.datePlaced = data ;
    this.datePlaced = new Date().getTime();
    this.ordersSuccess ="ממתין";

    console.log('this._workerId = ' , this._workerId )

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
          id:i.$key
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })    
  }
}