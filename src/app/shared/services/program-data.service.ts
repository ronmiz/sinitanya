import { Injectable } from '@angular/core';
import { IProgramData } from './../models/IPrograme-data';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProgramDataService {

  private Iprogram: IProgramData;
  public extraSum:number = 0 ;
  public totalExtraItemAll = 0;


  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();


  private pData: Array<any> = [
    { id: 1, name: '1', limit: '220', price: '180' },
    { id: 2, name: '2', limit: '450', price: '360' },
    { id: 3, name: '3', limit: '770', price: '536' },
    { id: 4, name: '4', limit: '1100', price: '770' },
    { id: 5, name: '5', limit: '3460', price: '1100' },
    { id: 6, name: '6', limit: 'אין הגבלה', price: 'אין הגבלה' },
  ];

  public idExtraToPrograme:string = "04";
  public idExtraItemAll30:string = '49';
  public idExtraItemAll50:string = '50';

  private programType: number = 6;
  public programLimit: number;
  public programPrice: number;
  public programName: string = "חופשי מסלול";
  public totalCartSum: number;
  
  public isOverLimit: boolean ;
  public canGoOverLimit: boolean ;
  public isInPrograme:boolean;
  public addExtraItem:boolean;
  public isOkToAddExstraItem:boolean  = false;

  changeProgramName: Subject<string> = new Subject<string>();
  changeProgramLimit: Subject<number> = new Subject<number>();
  changeProgramPrice: Subject<number> = new Subject<number>();
  changeProgramType: Subject<number> = new Subject<number>();
  changeTotalPrice: Subject<number> = new Subject<number>();
  changeCanGoOverLimit: Subject<boolean> = new Subject<boolean>();
  changeIsOverLimit: Subject<boolean> = new Subject<boolean>();
  changeIsInPrograme: Subject<boolean> = new Subject<boolean>();
  changeAddExtraItem: Subject<boolean> = new Subject<boolean>();
  changeIsOkToAddExstraItem: Subject<boolean> = new Subject<boolean>();
 
  /**
   * check - showWindow for extraAll item
   */
  checkAddAllExtraItem: Subject<boolean> = new Subject<boolean>();
  changeIsOkToAddAllExtraItem: Subject<boolean> = new Subject<boolean>();


  constructor() {
    this.setProgram(5);
    this.changeProgramName.next(this.programName);
  }

  changeMessage(message: boolean) {
    //console.log('------ changeMessage(message: boolean)  ----------');
    //console.log(message)
    this.messageSource.next(message);
  }

  set type(value: number) {
    this.programType = value;
  }
  get type() {
    return this.programType;
  }

  public setProgram(value: number): void {
    let myContent: IProgramData[] = this.pData;
    this.programName  = myContent[value].name;
    this.programLimit = (myContent[value].limit) as number;
    this.programPrice = (myContent[value].price) as number;
    this.programType  = myContent[value].id;
    this.programUpdate();
  }
  programUpdate() {
    //console.log(this.programName)
    this.changeProgramName.next(this.programName);
    this.changeProgramPrice.next(this.programPrice);
    this.changeProgramLimit.next(this.programLimit);
    this.changeProgramType.next(this.programType);
    switch(this.programType) { 
      case 1: { 
         this.isInPrograme = false;
         break; 
      } 
      case 2: { 
        this.isInPrograme = false;
         break; 
      } 
      case 3: { 
        this.isInPrograme = false;
        break; 
     } 
      default: { 
        this.isInPrograme = true; 
         break; 
      } 
   }
   this.changeIsInPrograme.next(this.isInPrograme );
   //console.log('this.isInPrograme :: ' ,this.isInPrograme );
   
   this.updateCanGoOverLimt(false);
  //  this.updateAddAllExtraItem(false);
  this.extraSum = 0 ;
  this.totalExtraItemAll = 0;

  }
  updateTotalSum(sum: number) {
    this.totalCartSum = sum
    this.checkTotalSum(sum)
    //console.log('pds this.totalCartSum update  = ', sum);
  }
  updateCanGoOverLimt(value: boolean) {
    this.canGoOverLimit = value;
    this.changeCanGoOverLimit.next(this.canGoOverLimit)
    //console.log("PD  updateCanGoOverLimt ::" , this.canGoOverLimit)
  }
  checkTotalSum(value: number) {
    if(this.extraSum > 0){
      value = value - this.extraSum;
    }
    if(this.totalExtraItemAll > 0){
      value = value - this.totalExtraItemAll;
    }
    if (value > this.programLimit && !this.canGoOverLimit) {
      //console.log('עברת את סכום החבילה ', this.programLimit, ' סכך הכל לתשלום :', value);
      
      //console.log('---------- this.extraSum -------------');
      //console.log(this.extraSum);
    
      //console.log('---------- this.totalExtraItemAll -------------');
      //console.log(this.totalExtraItemAll);

      //console.log('---------- this.programLimit-------------');
      //console.log(this.programLimit);

      //console.log('---------- this.programPrice-------------');
      //console.log(this.programPrice);


      this.changeTotalPrice.next(value);
      this.isOverLimit = true;
      this.changeIsOverLimit.next(this.isOverLimit)
    }
    else {
      this.isOverLimit = false;
      this.changeIsOverLimit.next(this.isOverLimit)
    }
  }

  updateExrtaSum(value){
    this.extraSum = this.extraSum + value;
    //console.log('---------- this.extraSum -------------');
    //console.log(this.extraSum);
    // this.updateExrtaSumAll(this.extraSum )
  }
  updateExrtaSumAll(value){
    this.totalExtraItemAll = this.totalExtraItemAll + value;
    //console.log('---------- this.totalExtraItemAll -------------');
    //console.log(this.totalExtraItemAll);
  }
  updateAddExtraItem(value){
    this.changeIsOkToAddExstraItem.next(value)
  }
  updateAddAllExtraItem(value){
    //console.log('---------- updateAddAllExtraItem(value) this.changeIsOkToAddAllExtraItem : -------------');
    //console.log(this.changeIsOkToAddAllExtraItem);
    this.changeIsOkToAddAllExtraItem.next(value)
  }
}
