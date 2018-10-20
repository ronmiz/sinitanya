import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ProgramDataService } from '../../../shared/services/program-data.service';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';
import { IMassageData } from './../../../shared/models/IMassage-data';



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
  _isInPorgrameSubscription:any;
  
  isOverLimit:boolean = false;
  isOkToOverLimit:boolean = false;
  addExtraItem:boolean;

  massageCard:IMassageData;
  massageOverLimit:IMassageData;
  massageNotInProgram:IMassageData;

 

  constructor(private SimpleModalService: SimpleModalService, private progDataService:ProgramDataService,private router:Router) { }

  ngOnInit() {
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
    this._isOkToOverLimitsubscription = this.progDataService.changeCanGoOverLimit.subscribe((value) => { 
      console.log('this.isOkToOverLimit : ' , value)
      this.isOkToOverLimit = value
    });
    this._isOverLimitsubscription = this.progDataService.changeIsOverLimit.subscribe((value) => { 
      console.log('this.isOverLimit : ' , value)
      this.isOverLimit = value
    });
    this._isInPorgrameSubscription = this.progDataService.changeAddExtraItem.subscribe(() => { 
     // this.addExtraItem = value
        this.massageNotInProgram.titleStr = 'הודעה !';
        this.massageNotInProgram.bodyStr = 'פריט זה אינו חלק מהמסלול האם ברצונך להוסיפו לעגלה ?';
        // if(!this.progDataService.isInPrograme && !this.progDataService.isOkToAddExstraItem ){
          this.showConfirm(this.massageNotInProgram);
        // }
      });
    this._subscription = this.progDataService.changeTotalPrice.subscribe((value) => { 
      this.totalCartSum = value
        console.log('this.totalCartSum  == ' ,this.totalCartSum  )
        this.massageOverLimit.titleStr = 'עברת את הסכום למסלול ';
        this.massageOverLimit.bodyStr = 'האם ברצונך לעבור לתשלום?';
        if(!this.isOkToOverLimit){
          console.log('this.isOkToOverLimit = ' ,this.isOkToOverLimit)
          this.showConfirm(this.massageOverLimit);
        }
      });
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
          this.router.navigate(['/app-products']);
        } 
        
        if(this.confirmResult && data.actionType === 2 )
        {
          console.log('data.actionType === 2')
          this.isOkToOverLimit = true;
          this.progDataService.changeCanGoOverLimit.next(false)
          // this.massageOverLimit.isOkToOverLimit = true;
          this.SimpleModalService.removeModal
          this.router.navigate(['/shopping-cart']);
         
        } else if (!this.confirmResult)
        {
          this.progDataService.changeCanGoOverLimit.next(true)
          this.SimpleModalService.removeModal
        }
      
        if(this.confirmResult && data.actionType === 3 )
        {
          console.log('data.actionType === 3')
          this.addExtraItem = true;
          this.progDataService.updateAddExtraItem(true);
          // this.progDataService.isOkToAddExstraItem = true;
          this.SimpleModalService.removeModal
        }else {
          // this.progDataService.isOkToAddExstraItem = false;
          this.progDataService.updateAddExtraItem(false);
          this.SimpleModalService.removeModal
        }
    });
  }
  clickCard(value){
    // console.log(value);
    let type:number = parseInt(value);
    this.progDataService.setProgram(type);
    this.massageCard.bodyStr  = 'בחרת במסלול ' + (type+1);
    this.massageCard.titleStr = 'אנא אשר מסלול נבחר';
    this.massageCard.actionType = 1;
    this.showConfirm(this.massageCard);
  }
}
