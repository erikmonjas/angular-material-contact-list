import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { RecoverPasswordPageComponent } from "./components/recover-password-page/recover-password-page.component";

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", component: RegisterPageComponent, pathMatch: "full" },
  {
    path: "home",
    component: HomePageComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "recover-password",
    component: RecoverPasswordPageComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(["/"]);
    };
  }
}
