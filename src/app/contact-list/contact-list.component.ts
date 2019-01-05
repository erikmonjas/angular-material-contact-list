import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact/contact.component';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  displayedColumns: string[] = ['checkbox', 'name', 'email', 'phone', 'icon'];

  constructor(private contactService: ContactService) { }

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

}
