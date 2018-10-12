import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ProgramDataService } from '../../../shared/services/program-data.service';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';


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

  constructor(private SimpleModalService: SimpleModalService, private progdata:ProgramDataService,private router:Router) { }

  ngOnInit() {
    console.log('in on home init')
  }
  showConfirm() {
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: this.massageTitle,
      message: this.massageBody})
      .subscribe((isConfirmed) => {
        // Get modal result
        this.confirmResult = isConfirmed;
        if (this.confirmResult){
          console.log(' this.confirmResult : ' , this.confirmResult);
          this.router.navigate(['/app-products']);
        }
    });
  }
  clickCard(value){
    console.log(value);
    let type:number = parseInt(value);
    this.progdata.setProgram(type);
    this.massageBody = 'בחרת במסלול ' + (type+1);
    this.massageTitle = 'אנא אשר מסלול נבחר'
    this.showConfirm();
  }
}
