import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { WorkersService } from 'shared/services/workers.service';
import { AuthService } from 'shared/services/auth.service';
import { UserInfoService } from 'shared/services/user-info.service';
import { workerInfo } from './../../../shared/models/worker-info';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'admin-orders-workers',
  templateUrl: './admin-orders-workers.component.html',
  styleUrls: ['./admin-orders-workers.component.css']
})

export class AdminOrdersWorkersComponent implements OnInit {
  orders$;
  allOrders;
  totalOrdersSum: number;
  totalNumOfOrders: number;
  workers$
  orderByWorker = [];
  sortArrayOrders = [];
  workerIdeList =  [];
  public workerListSummry = [];

  constructor(private orderService: OrderService,
    private workersService: WorkersService,
    private authService: AuthService,
    private userInfoService: UserInfoService) { }

  ngOnInit() {

    this.orders$ = this.orderService.getOrdersBySuccess();
    let workerName: string;
    let workerId: string;
    this.allOrders = this.orders$.subscribe((order) => {
    let sum: number = 0;
    let OrderCount: number = 0;

      this.totalNumOfOrders = order.length
      for (let i = 0; i < order.length; i++) {
        if (order[i].totalOrderPrice !== undefined) {
          sum = sum + parseInt(order[i].totalOrderPrice)

          workerName = order[i]['workderNameInfo'];
          workerId = order[i]['workerId'];
          this.totalOrdersSum = sum;
         
          if (this.orderByWorker[workerName] !== undefined) {

            //console.log(this.orderByWorker[workerName].workerSum)

            let workerSumNew = this.orderByWorker[workerName].workerSum + (parseInt(order[i].totalOrderPrice))

            this.orderByWorker[workerName].workerSum = workerSumNew;
          }
          else {
            let info = { workerId: workerId, workerName: workerName, workerSum: (parseInt(order[i].totalOrderPrice)) }
            this.orderByWorker.push(info)
          }
        }
      }

    
      //console.log(this.orderByWorker);
      this.buildWorkerIdList();
     
        let wId:string = this.orderByWorker[0]['workerId']

      for(let i =0 ; i< this.orderByWorker.length ;i ++){
        let sum
        let count
        if(this.orderByWorker[i]['workerId'] === wId){
        this.sortArrayOrders.push(this.orderByWorker[i])

        }
      }
    });
    
     //this.workers$ = this.workersService.getAll()
  }

  buildWorkerIdList(){
    for(let i = 0; i< this.orderByWorker.length;i++){
      if(this.workerIdeList.indexOf(this.orderByWorker[i]['workerId']) ===  -1){
        //console.log('this.workerIdeList :' , this.workerIdeList.indexOf(this.orderByWorker[i]['workerId']))
        this.workerIdeList.push(this.orderByWorker[i]['workerId'])
      }
    }
    for(let i = 0 ; i < this.workerIdeList.length; i++){
      let obj:WorkerData = { workerId:"",workerName:"",workerSum:0,WorkerOrderCount:0} ;
      let sum:number = 0;      
      obj.workerId = this.workerIdeList[i];
      this.workerListSummry.push(obj)
      obj.WorkerOrderCount = 0;  
      for(let j = 0 ; j < this.orderByWorker.length; j++){ 
        if(this.orderByWorker[j]['workerId'] === this.workerIdeList[i]){
          obj.workerName = this.orderByWorker[j]['workerName'].toString();
          obj.workerSum = sum = sum + this.orderByWorker[j]['workerSum']
          obj.WorkerOrderCount++
          this.workerListSummry[i].workerSum =  obj.workerSum;
          this.workerListSummry[i].WorkerOrderCount =  obj.WorkerOrderCount;
        }
      }
    }

  }
}

export interface WorkerData{
  workerId:string,
  workerName:string,
  workerSum: number,
  WorkerOrderCount: number
}
