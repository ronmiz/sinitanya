import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { UserInfo } from 'firebase/app';

@Injectable()
export class WorkersService {

  constructor(private db: AngularFireDatabase) { }
  getAll() {
    return this.db.list('/userInfo');
  }
  getUserInfo(workerId): FirebaseObjectObservable<UserInfo> { 
    return this.db.object('/userInfo/' + workerId);
  }

}
