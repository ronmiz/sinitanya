import { Injectable } from '@angular/core';
import { IProgramData } from './../models/IPrograme-data';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgramDataService {
 
  private Iprogram:IProgramData;
 
  private pData:Array<any> = [
    { id: 1, name: 'מסלול 1', limit: '220', price: '180'},
    { id: 2, name: 'מסלול 2', limit: '450' , price: '360' },
    { id: 3, name: 'מסלול 3', limit: '770' , price: '536' },
    { id: 4, name: 'מסלול 4', limit: '1100', price: '770' },
    { id: 5, name: 'מסלול 5', limit: '1100', price: '1100' },
    { id: 6, name: 'חופשי מסלול', limit: '', price: '0' },
  ];

  private programType:number = 6;
  public programLimit:number;
  public programPrice:number;
  public programName:string = "חופשי מסלול";
  public totalCartSum:number;

  changeProgramName:  Subject<string> = new Subject<string>();
  changeProgramLimit: Subject<number> = new Subject<number>();
  changeProgramPrice: Subject<number> = new Subject<number>();
  changeProgramType:  Subject<number> = new Subject<number>();
  changeTotalPrice:   Subject<number> = new Subject<number>();

  constructor() {
    this.setProgram(5);
    this.changeProgramName.next(this.programName);
   }

  set type(value:number){
    this.programType = value;
  }
  get type(){
    return this.programType;
  }

  public setProgram(value:number):void{
    let myContent : IProgramData[] = this.pData; 
    this.programName  = myContent[value].name;
    this.programLimit = myContent[value].limit;
    this.programPrice = myContent[value].price;
    this.programType = myContent[value].id;
    this.programUpdate();
  }
  programUpdate(){
    console.log(this.programName)
    this.changeProgramName.next(this.programName);
    this.changeProgramPrice.next(this.programPrice);
    this.changeProgramLimit.next(this.programLimit);
    this.changeProgramType.next(this.programType);
  }
  updateTotalSum(sum:number){
    this.totalCartSum = sum
    console.log('this.totalCartSum update  = ',sum);
  }

}
