import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact/contact.component';
import { ContactService } from '../services/contact.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ContactFormComponent} from '../contact-form/contact-form.component';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];

  constructor(private contactService: ContactService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }

  deleteContact(id){
    this.contactService.deleteContact(id);
  }

  openDialog(id): void {
    this.contactService.getContactId(id);
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '80vw'
    });
  }

}
