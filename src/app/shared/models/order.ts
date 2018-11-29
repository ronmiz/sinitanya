import { ShoppingCart } from './shopping-cart';

export class Order { 
  datePlaced: number; 
  ordersSuccess:string;
  items: any[];
  _workerId: string;
  constructor(public programName,public workderNameInfo,public totalOrderPrice,public workerId:string,public shipping: any, shoppingCart: ShoppingCart) {

    this.datePlaced = new Date().getTime();
    this.ordersSuccess ="ממתין";

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