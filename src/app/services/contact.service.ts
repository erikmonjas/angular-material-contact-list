import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';


import { Contact } from '../contact/contact.component';
import { CONTACTS } from '../mock-contacts';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  contactId = new BehaviorSubject<any>('');
  contactIdObs = this.contactId.asObservable();

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

  getContact(id: string): Observable<Contact> {
    return of(CONTACTS.find(contact => contact.id === id));
  }

  getContactId(id) {
    this.contactId.next(id);
  }

  constructor() { }
}
