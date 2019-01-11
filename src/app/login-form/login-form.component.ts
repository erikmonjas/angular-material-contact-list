import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  userData = this.fb.group({
    userEmail: ['', Validators.compose([Validators.required, Validators.email])],
    userPass: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
