import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: RegisterPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
