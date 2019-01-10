import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact/contact.component';
import { ContactService } from '../services/contact.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ContactFormComponent} from '../contact-form/contact-form.component';

@Component({
  selector: 'fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {
  contacts: Contact[];
  favs: Contact[];

  constructor(private contactService: ContactService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getContacts();
    this.favs = this.contacts.filter(contact => !!contact.isFav);
  }

  getContacts(): void {
    this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

  deleteContact(id){
    this.contactService.deleteContact(id);
    this.favs = this.contacts.filter(contact => !!contact.isFav);
  }

  toggleFav(id) {
    this.contactService.toggleFav(id);
    this.favs = this.contacts.filter(contact => !!contact.isFav);
  }

  openDialog(id): void {
    this.contactService.getContactId(id);
    if (window.innerWidth < 768){
      const dialogRef = this.dialog.open(ContactFormComponent, {
        width: '80vw'
      });
    } else {
      const dialogRef = this.dialog.open(ContactFormComponent, {
        width: '60vw'
      });
    }
  }
}
