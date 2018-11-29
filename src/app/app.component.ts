import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  deviceInfo = null;
  deviceType:string;

  constructor(private userService: UserService, private auth: AuthService, router: Router,
    private SimpleModalService: SimpleModalService,
    private deviceService: DeviceDetectorService) {
    auth.user$.subscribe(user => {
      if (!user) return; 

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return; 

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
    this.epicFunction();
  }
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    if(!isMobile && !isTablet)
    {
      this.deviceType = "isDesktopDevice";
    }
    else if (isTablet){
      this.deviceType = "isTablet";
    }
    else{
      this.deviceType = "isMobile";
    }
    console.log(this.deviceInfo);
    console.log("isMobile",isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log("isTablet",isTablet);  // returns if the device us a tablet (iPad etc)
    console.log("isDesktopDevice",isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
  ngOnInit(){
  }
}
