import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidatorFn } from '@angular/forms';

const passwordValidator: ValidatorFn = (fg: FormGroup) => {
  const pass = fg.get('userPass').value;
  const passRepeat = fg.get('userPassRepeat').value;
  return !!pass && !!passRepeat && pass === passRepeat
    ? null
    : { confirmation: true };
};

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  passwordsMatch:boolean;

  userData = this.fb.group({
    userEmail: ['', Validators.compose([Validators.required, Validators.email])],
    userPass: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    userPassRepeat: ['', Validators.required]
  }, {validator: passwordValidator});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(){
  }

  checkPasswords(){
    if (this.userData.value.userPass === this.userData.value.userPassRepeat) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

}
