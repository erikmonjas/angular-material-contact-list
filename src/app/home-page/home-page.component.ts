import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact/contact.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { FavListComponent } from '../fav-list/fav-list.component';
import { ModalComponent } from '../modal/modal.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  favsView:boolean;

  favsEvent(value) {
    this.favsView = value;
  }

  constructor() { }

  ngOnInit() {
  }

}
