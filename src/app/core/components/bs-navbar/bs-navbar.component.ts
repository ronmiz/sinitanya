// import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, VERSION, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ProgramDataService } from './../../../shared/services/program-data.service';
import { Subscriber } from 'rxjs/Subscriber';
import { SubjectSubscriber } from 'rxjs/Subject';
import { ShoppingCart } from './../../../shared/models/shopping-cart';
import { Router } from '@angular/router';


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
  isInPrograme:boolean;
  okToAddextra:boolean;
  currentPay:number;
  _subscription:any;
  cartTotalPrice:number;
  totalSum:number;
  strSerche:string;
  @ViewChild('navbarToggler') navbarToggler: ElementRef;

	// angularVersion: string;
 


  constructor(private auth: AuthService,
     private shoppingCartService: ShoppingCartService,
     private progDataService:ProgramDataService,
     private router:Router) {}

  async ngOnInit() { 
    // this.angularVersion = VERSION.full;
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
    
    
    this.cart$.subscribe(x => {
      // if(this.isInPrograme || this.okToAddextra){
        this.totalSum = x.totalPrice;
        this.updatetotalPrice();
      // }
      // this.updatetotalPrice();
    });
   
    this.programName = this.progDataService.programName;
    this._subscription = this.progDataService.changeProgramName.subscribe((value) => { 
    this.programName = value
      //console.log('this.programName == ' ,this.programName  )
    });

    this.programLimit = this.progDataService.programLimit;
    this._subscription = this.progDataService.changeProgramLimit.subscribe((value) => { 
    this.programLimit = value
      //console.log('this.programLimit == ' ,this.programLimit  )
    });
    this.programPrice = this.progDataService.programPrice;
    this._subscription = this.progDataService.changeProgramPrice.subscribe((value) => { 
    this.programPrice = value
      //console.log('this.programPrice == ' ,this.programPrice  )
    });
    this.isInPrograme = this.progDataService.isInPrograme;
    this._subscription = this.progDataService.changeIsInPrograme.subscribe((value) => { 
    this.isInPrograme = value
      //console.log('this.isInPrograme  == ' ,this.isInPrograme   )
    });
  }
  updatetotalPrice(){
    this.progDataService.updateTotalSum(this.totalSum);
  }
  logout() {
    this.auth.logout();
  }
  checkAdmin(value){
    //console.log('check admin clicked' , value);
    if(value === '56349822'){
      this.router.navigate(['/login']);
    }
  }
  collapseNav() {
		if (this.navBarTogglerIsVisible()) {
			//console.log('collapseNav in NavigationComponent clicking navbarToggler')
			this.navbarToggler.nativeElement.click();
		}
	}

	private navBarTogglerIsVisible() {
    const isVisible: boolean = (this.navbarToggler.nativeElement.offsetParent !== null);

		return isVisible;
	}

}
