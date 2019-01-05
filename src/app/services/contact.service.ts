import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


import { Contact } from '../contact/contact.component';
import { CONTACTS } from '../mock-contacts';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  getContacts(): Observable<Contact[]> {
    return of(CONTACTS);
  }

  createContact(contact): void{
    CONTACTS.push(contact);
    return
  }

  deleteContact(id): void{
    const contactToDelete = CONTACTS.find(contact => contact.id === id);
    const indexOfContactToDelete = CONTACTS.indexOf(contactToDelete);
    CONTACTS.splice(indexOfContactToDelete, 1);

  }

  constructor() { }
}
