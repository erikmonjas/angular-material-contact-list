import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  isLogin:boolean;
  userName:string;

  constructor(private authService:AuthService, private router: Router,) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if(!!auth){
        this.isLogin = true;
        this.userName = auth.email;
      }
    })
  }

  signOut(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
