import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'shared/services/user-info.service';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';
import { IMassageData } from './../../shared/models/IMassage-data';
import { SimpleModalService } from 'ngx-simple-modal';


@Component({
  selector: 'form-worker',
  templateUrl: './form-worker.component.html',
  styleUrls: ['./form-worker.component.css']
})
export class FormWorkerComponent implements OnInit {
  confirmResult;
  confirmRegisterMassage:IMassageData;
  
    public workerInfo  = {}
  constructor(private userInfoService:UserInfoService ,private  SimpleModalService: SimpleModalService) { }

  addWorker(f){
    let info =JSON.parse( JSON.stringify(f.value ));
    this.userInfoService.createUserInfo(info);
    this.confirmRegisterMassage = {
      titleStr:"אישור רישום",
      bodyStr:"הפרטים נשמרו בהצלחה",
      isOverLimit:false,
      isOkToOverLimit:false,
      actionType:10
    }
    this.showConfirm(this.confirmRegisterMassage)

  }
  ngOnInit() {
    this.workerInfo =  this.userInfoService.getUserInfo().subscribe(u => this.workerInfo = u);
  }
  showConfirm(data){
    this.SimpleModalService.removeAll()
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: data.titleStr,
      message: data.bodyStr})
      .subscribe((isConfirmed) => {
        this.confirmResult = isConfirmed;
        if (this.confirmResult && data.actionType === 1)
        {        
          this.SimpleModalService.removeModal
          // this.router.navigate(['/app-products']);
        } 
   });
  }
}
