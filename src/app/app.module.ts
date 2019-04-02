import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { ContactListComponent } from "./components/contact-list/contact-list.component";
import { MatPaginatorModule, MatSortModule } from "@angular/material";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ModalComponent } from "./components/modal/modal.component";
import { TopMenuComponent } from "./components/top-menu/top-menu.component";
import { FavListComponent } from "./components/fav-list/fav-list.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import {
  RegisterFormComponent,
  WrongRegisterComponent
} from "./components/register-form/register-form.component";
import {
  LoginFormComponent,
  WrongDataAlertComponent
} from "./components/login-form/login-form.component";
import {
  RecoverPasswordPageComponent,
  RecoverPassErrorComponent
} from "./components/recover-password-page/recover-password-page.component";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";

import { environment } from "../environments/environment";

import { AuthGuard } from "./guards/auth.guard";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SearchComponent } from "./components/search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactFormComponent,
    ModalComponent,
    TopMenuComponent,
    FavListComponent,
    HomePageComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    LoginFormComponent,
    WrongDataAlertComponent,
    WrongRegisterComponent,
    UserInfoComponent,
    RecoverPasswordPageComponent,
    RecoverPassErrorComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  entryComponents: [
    ContactFormComponent,
    WrongDataAlertComponent,
    WrongRegisterComponent,
    RecoverPassErrorComponent
  ],
  providers: [AuthGuard, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
