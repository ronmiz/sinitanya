import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase/app';

export class userInformation{
  userInfo: string;
}

@Injectable()
export class UserInfoService {
  public userId:string;
  userInfos: FirebaseListObservable<userInformation[]> = null;

  constructor(private db: AngularFireDatabase, private afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user)  this.userId = user.uid
    });
    // console.log('---------UserInfoService this.userId-----------')
    // console.log(this.userId)
   }
   createUserInfo(info){
    if(this.db.list('userInfo/' )){
       this.db.list('userInfo/' ).update(this.userId,info)
       //this.db.list(`userInfo/${this.userId}`).update(this.userId,info)
     }else{
       this.db.list('userInfo/' ).push(info);
     }
  }
  // getUserInfo(): FirebaseListObservable<userInformation[]>{
  //   if(!this.userId) return;
  //   this.userInfos = this.db.list("userInfo/" + this.userId);
  //    console.log("======= getUserInfo() UserInfoService=======");
  //    console.log(this.userId)
  //    console.log(this.userInfos)
  //   return this.userInfos;
  // }

  getUserInfo(): FirebaseObjectObservable<UserInfo> { 
    return this.db.object('/userInfo/' + this.userId);
  }

}
