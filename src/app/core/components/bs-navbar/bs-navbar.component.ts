import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ProgramDataService } from './../../../shared/services/program-data.service';
import { Subscriber } from 'rxjs/Subscriber';
import { SubjectSubscriber } from 'rxjs/Subject';

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


  constructor(private auth: AuthService,
     private shoppingCartService: ShoppingCartService,
     private progDataService:ProgramDataService) { 
     
      this.programName = this.progDataService.programName;
      this._subscription = progDataService.changeProgramName.subscribe((value) => { 
      this.programName = value
        console.log('this.programName == ' ,this.programName  )
      });

      this.programLimit = this.progDataService.programLimit;
      this._subscription = progDataService.changeProgramLimit.subscribe((value) => { 
      this.programLimit = value
        console.log('this.programLimit == ' ,this.programLimit  )
      });
      this.programPrice = this.progDataService.programPrice;
      this._subscription = progDataService.changeProgramPrice.subscribe((value) => { 
      this.programPrice = value
        console.log('this.programPrice == ' ,this.programPrice  )
      });
  }

  async ngOnInit() { 
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
    console.log('this.cart$ : ' , this.cart$)
  }
  
  logout() {
    this.auth.logout();
  }

}
