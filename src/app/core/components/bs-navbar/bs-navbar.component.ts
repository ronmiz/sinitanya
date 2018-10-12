// import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ProgramDataService } from './../../../shared/services/program-data.service';
import { Subscriber } from 'rxjs/Subscriber';
import { SubjectSubscriber } from 'rxjs/Subject';
import { ShoppingCart } from './../../../shared/models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  programName:string='';
  programLimit:number;
  programPrice:number;
  currentPay:number;
  _subscription:any;
  cartTotalPrice:number;
  totalSum:number;
 


  constructor(private auth: AuthService,
     private shoppingCartService: ShoppingCartService,
     private progDataService:ProgramDataService) {}

  async ngOnInit() { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
    console.log(this.cart$.subscribe(x => console.log(x.totalPrice)))
    this.cart$.subscribe(x => {
      this.totalSum = x.totalPrice
      this.updatetotalPrice()
    
    });
   
    this.programName = this.progDataService.programName;
    this._subscription = this.progDataService.changeProgramName.subscribe((value) => { 
    this.programName = value
      console.log('this.programName == ' ,this.programName  )
    });

    this.programLimit = this.progDataService.programLimit;
    this._subscription = this.progDataService.changeProgramLimit.subscribe((value) => { 
    this.programLimit = value
      console.log('this.programLimit == ' ,this.programLimit  )
    });
    this.programPrice = this.progDataService.programPrice;
    this._subscription = this.progDataService.changeProgramPrice.subscribe((value) => { 
    this.programPrice = value
      console.log('this.programPrice == ' ,this.programPrice  )
    });
    
  }
  updatetotalPrice(){
    this.progDataService.updateTotalSum(this.totalSum);
  }
  logout() {
    this.auth.logout();
  }

}
