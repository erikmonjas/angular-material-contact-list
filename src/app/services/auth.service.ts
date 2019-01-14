import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  wrongRegisterMsg = new BehaviorSubject<string>('');
  wrongRegisterMsgObs = this.wrongRegisterMsg.asObservable();

  constructor(public afAuth: AngularFireAuth) {  }


  registrationError(err) {
    this.wrongRegisterMsg.next(err);
  }

  registerUser(email:string, pass:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then( userData => resolve(userData), 
        err => reject (err));
    })
  }

  loginEmail(email:string, pass:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then( userData => resolve(userData), 
        err => reject (err));
    })
  }

  getAuth() {
    return this.afAuth.authState.pipe(map ( auth => {auth} ))
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
