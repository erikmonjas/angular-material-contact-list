import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-recover-password-page',
  templateUrl: './recover-password-page.component.html',
  styleUrls: ['./recover-password-page.component.scss']
})
export class RecoverPasswordPageComponent implements OnInit {

  userData = this.fb.group({
    userEmail: ['', Validators.compose([Validators.required, Validators.email])]
  });

  constructor(private fb: FormBuilder,private router: Router, public snackBar: MatSnackBar, private authService:AuthService) { }

  ngOnInit() {
    // firebase.auth().sendPasswordResetEmail('erik.monjas@gmail.com');
  }

  onSubmit(){
    firebase.auth().sendPasswordResetEmail(this.userData.value.userEmail)
    .then( (res) => {
      this.router.navigate(['/']);
    })
    .catch( (err) => {
      this.authService.registrationError(err.message);
      this.snackBar.openFromComponent(RecoverPassErrorComponent, {
        duration: 2000
      });
    } )
  }

}


@Component({
  selector: 'wrong-register',
  template: `
    <span class="alert-modal d-block text-center">{{wrongRegisterMsg}}</span>
  `,
  styles: []
})
export class RecoverPassErrorComponent {
  wrongRegisterMsg;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.wrongRegisterMsg = this.authService.wrongRegisterMsg.value;
  }
}
