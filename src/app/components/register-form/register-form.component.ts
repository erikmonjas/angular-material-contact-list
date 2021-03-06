import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

const passwordValidator: ValidatorFn = (fg: FormGroup) => {
  const pass = fg.get("userPass").value;
  const passRepeat = fg.get("userPassRepeat").value;
  return !!pass && !!passRepeat && pass === passRepeat
    ? null
    : { confirmation: true };
};

@Component({
  selector: "register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {
  passwordsMatch: boolean;

  userData = this.fb.group(
    {
      userEmail: [
        "",
        Validators.compose([Validators.required, Validators.email])
      ],
      userPass: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      userPassRepeat: ["", Validators.required]
    },
    { validator: passwordValidator }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService
      .registerUser(this.userData.value.userEmail, this.userData.value.userPass)
      .then(res => {
        this.router.navigate(["/home"]);
      })
      .catch(err => {
        this.authService.registrationError(err.message);
        this.snackBar.openFromComponent(WrongRegisterComponent, {
          duration: 2000
        });
      });
  }

  checkPasswords() {
    if (this.userData.value.userPass === this.userData.value.userPassRepeat) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }
}

@Component({
  selector: "wrong-register",
  template: `
    <span class="alert-modal d-block text-center">{{ wrongRegisterMsg }}</span>
  `,
  styles: []
})
export class WrongRegisterComponent {
  wrongRegisterMsg;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.wrongRegisterMsg = this.authService.wrongRegisterMsg.value;
  }
}
