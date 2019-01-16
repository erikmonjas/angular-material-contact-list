import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { RegisterFormComponent } from '../register-form/register-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {


  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if(!!auth){
        this.router.navigate(['/home']);
      }
    })
  }

}
