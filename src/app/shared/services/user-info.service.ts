import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from 'firebase/app';
import { workerInfo } from './../models/worker-info';

export class userInformation {
  userInfo: string;
}

@Injectable()
export class UserInfoService {
  public userId: string;
  userInfos: FirebaseListObservable<userInformation[]> = null;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid
    });
  }
  createUserInfo(info) {
    if (this.db.list('userInfo/')) {
      this.db.list('userInfo/').update(this.userId, info)
    } else {
      this.db.list('userInfo/').push(info);
    }
  }

  getUserInfo(): FirebaseObjectObservable<UserInfo> {
    return this.db.object('/userInfo/' + this.userId);
  }
  updateUserInfoOrder(userId, info: number) {
    let dataUpdate = {}
    let userInfo = this.getUserById(userId).subscribe((data) => {
      let workerTotalSale: number = parseInt(userInfo['totalSalesSum']);
      workerTotalSale = workerTotalSale + info
      let totalSalesCount: number = parseInt(userInfo['totalSalesCount']);
      totalSalesCount++
      dataUpdate = { 'totalSalesSum': workerTotalSale, 'totalSalesCount': totalSalesCount }
    })
    if (this.db.list('userInfo/')) {
      this.db.list('userInfo/').update(userId, dataUpdate)
    }
  }
  getUserById(id): FirebaseObjectObservable<workerInfo> {
    return this.db.object('/userInfo/' + id);
  }
}
