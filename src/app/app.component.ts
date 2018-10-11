import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';
import { SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  // confirmResult = null;
  // promptMessage = '';



  constructor(private userService: UserService, private auth: AuthService, router: Router,
    private SimpleModalService: SimpleModalService) {
    auth.user$.subscribe(user => {
      if (!user) return; 

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return; 

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });

  }
// showConfirm() {
//     this.SimpleModalService.addModal(ConfirmComponent, {
//       title: 'Confirmation',
//       message: 'Bla bla confirm some action?'})
//       .subscribe((isConfirmed) => {
//         // Get modal result
//         this.confirmResult = isConfirmed;
//     });
//   }
  ngOnInit(){
  }
}
