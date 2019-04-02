import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  userData = this.fb.group({
    userEmail: [
      "",
      Validators.compose([Validators.required, Validators.email])
    ],
    userPass: [
      "",
      Validators.compose([Validators.required, Validators.minLength(6)])
    ]
  });

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService
      .loginEmail(this.userData.value.userEmail, this.userData.value.userPass)
      .then(res => {
        this.router.navigate(["/home"]);
      })
      .catch(err => {
        this.snackBar.openFromComponent(WrongDataAlertComponent, {
          duration: 2000
        });
      });
  }
}

@Component({
  selector: "wrong-data-alert",
  template: `
    <span class="alert-modal d-block text-center"
      >Wrong data, please check e-mail and password</span
    >
  `,
  styles: []
})
export class WrongDataAlertComponent {}
