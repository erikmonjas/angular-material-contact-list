import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password-validator.directive';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  userData = this.fb.group({
    userEmail: ['', Validators.compose([Validators.required, Validators.email])],
    userPass: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    userPassRepeat: ['', Validators.required]
  }, {validators: passwordValidator});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.userData.value.userPassRepeat, this.userData.value.userPass, this.userData.value.userPassRepeat !== this.userData.value.userPass);
  }

}
