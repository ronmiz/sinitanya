import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ProgramDataService } from '../../../shared/services/program-data.service';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';
import { IMassageData } from './../../../shared/models/IMassage-data';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confirmResult = null;
  promptMessage = '';
  massageTitle:string;
  massageBody:string;
  totalCartSum:number;
  _subscription:any;
  _isOverLimitsubscription:any;
  _isOkToOverLimitsubscription:any;
  _isInProgramSubscription:any;
  _isOkToAddExtraAllProgramSubscription:any;
  
  isOverLimit:boolean = false;
  isOkToOverLimit:boolean = false;
  addExtraItem:boolean;

  massageCard:IMassageData;
  massageOverLimit:IMassageData;
  massageNotInProgram:IMassageData;
  massageNotInAllProgram:IMassageData;

  message: boolean = false ;

 

  constructor(private SimpleModalService: SimpleModalService, 
    private progDataService:ProgramDataService,
    private router:Router,
    private cartService:ShoppingCartService) { }

  ngOnInit() {
    this.progDataService.currentMessage.subscribe(message => {
      this.message = message
    })
  this.massageCard = {
      titleStr:"",
      bodyStr:"",
      isOverLimit:false,
      isOkToOverLimit:false,
      actionType:1
    };
    this.massageOverLimit = {
      titleStr:"",
      bodyStr:"",
      isOverLimit:false,
      isOkToOverLimit:false,
      actionType:2
    };
    this.massageNotInProgram = {
      titleStr:"",
      bodyStr:"",
      isOverLimit:false,
      isOkToOverLimit:false,
      actionType:3
    };
    this.massageNotInAllProgram = {
      titleStr:"",
      bodyStr:"",
      isOverLimit:false,
      isOkToOverLimit:false,
      actionType:4
    };
    this._isOkToOverLimitsubscription = this.progDataService.changeCanGoOverLimit.subscribe((value) => { 
      this.isOkToOverLimit = value
    });
    this._isOverLimitsubscription = this.progDataService.changeIsOverLimit.subscribe((value) => { 
      this.isOverLimit = value
    });
    this._isInProgramSubscription = this.progDataService.changeAddExtraItem.subscribe(() => { 
        this.massageNotInProgram.titleStr = 'הודעה !';
        this.massageNotInProgram.bodyStr = 'פריט זה אינו חלק מהמסלול האם ברצונך להוסיפו לעגלה ?';
          this.showConfirm(this.massageNotInProgram);
      });
    this._subscription = this.progDataService.changeTotalPrice.subscribe((value) => { 
      this.totalCartSum = value
        this.massageOverLimit.titleStr = 'עברת את הסכום למסלול ';
        this.massageOverLimit.bodyStr = 'האם ברצונך לעבור לתשלום?';
        if(!this.isOkToOverLimit){
          this.showConfirm(this.massageOverLimit);
        }
      });
     this._isOkToAddExtraAllProgramSubscription = this.progDataService.checkAddAllExtraItem.subscribe(() => {
      this.massageNotInAllProgram.titleStr = 'הודעה !';
      this.massageNotInAllProgram.bodyStr = 'פריט זה אינו חלק מהמסלול האם ברצונך להוסיפו לעגלה ?';
        this.showConfirm(this.massageNotInAllProgram);
     });
  }

  newMessage() {
    this.progDataService.changeMessage(this.message)
  }
showConfirm(data:IMassageData) {

    this.SimpleModalService.removeAll()
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: data.titleStr,
      message: data.bodyStr})
      .subscribe((isConfirmed) => {
        this.confirmResult = isConfirmed;
        if (this.confirmResult && data.actionType === 1)
        {        
          this.SimpleModalService.removeModal
          this.cartService.clearCart()
          this.router.navigate(['/app-products']);
        } 
        
        if(this.confirmResult && data.actionType === 2 )
        {
          this.progDataService.updateCanGoOverLimt(true)
          this.message = true;
          this.newMessage()
          this.SimpleModalService.removeModal
          this.router.navigate(['/shopping-cart']);
         
        } else if (!this.confirmResult)
        {
          this.message = false;
          this.newMessage()
          this.progDataService.updateCanGoOverLimt(false)
          this.SimpleModalService.removeModal
        }
      
        if(this.confirmResult && data.actionType === 3 )
        {
          this.addExtraItem = true;
          this.progDataService.updateAddExtraItem(true);

          this.SimpleModalService.removeModal
        }else {
          this.SimpleModalService.removeModal
        }

        if(this.confirmResult && data.actionType === 4 )
        {
          this.addExtraItem = true;
          this.progDataService.updateAddAllExtraItem(true);

          this.SimpleModalService.removeModal
        }else {
          this.SimpleModalService.removeModal
        }
        if(this.confirmResult && data.actionType === 10)
          this.SimpleModalService.removeModal
    });
  }
  clickCard(value){
    // let type:number = parseInt(value);
    // this.progDataService.setProgram(type);
    // this.massageCard.bodyStr  = 'בחרת במסלול ' + (type+1);
    // this.massageCard.titleStr = 'שים לב בעת בחירת מסלול העגלה מתאפסת';
    // this.massageCard.actionType = 1;
    // if(type+1 === 5){
    //   this.cartService.addAllProducts(2);
    //   this.router.navigate(['/shopping-cart']);
    // }else{
    //   this.showConfirm(this.massageCard);
    // }
  }
}
