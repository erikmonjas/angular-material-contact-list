import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';


import { Contact } from '../contact/contact.component';
import { CONTACTS } from '../mock-contacts';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  contactId = new BehaviorSubject<any>('');
  contactIdObs = this.contactId.asObservable();

  getContacts(): Observable<Contact[]> {
    this.sortContacts();
    return of(CONTACTS);
  }

  createContact(contact): void{
    CONTACTS.push(contact);
    this.sortContacts();
  }

  createFBContact(contact):void{
    let userUID:string;
    const contactID = new Date().getTime().toString();
    this.authService.getAuth().subscribe( auth => {
      if(!!auth){
        userUID = auth.uid;
        this.afs.collection(userUID).doc(contactID).set(contact);
      }
    })
    // this.afs.collection('erik.monjas').doc('first').set({name: 'Alba', phone: '65489781'})
  }

  deleteContact(id): void{
    const contactToDelete = CONTACTS.find(contact => contact.id === id);
    const indexOfContactToDelete = CONTACTS.indexOf(contactToDelete);
    CONTACTS.splice(indexOfContactToDelete, 1);
  }

  deleteFBContact(id){
    let userUID:string;
    this.authService.getAuth().subscribe( auth => {
      if(!!auth){
        userUID = auth.uid;
        this.afs.collection(userUID).doc(id).delete();
      }
    })
  }

  getContact(id: string): Observable<Contact> {
    return of(CONTACTS.find(contact => contact.id === id));
  }

  getContactId(id) {
    this.contactId.next(id);
  }

  emptyContactId(){
    this.contactId.next(undefined);
  }

  updateContact(id, contactData) {
    const contact = CONTACTS.find(contact => 
      contact.id === id
    );
    contact.name = contactData.name;
    contact.email = contactData.email;
    contact.phone = contactData.phone;
    contact.address = contactData.address;
    contact.notes = contactData.notes;
    contact.isFav = contactData.isFav;
    this.sortContacts();
  }

  toggleFav(id) {

    const contact = CONTACTS.find(contact => 
      contact.id === id
    );
    if (!!contact.isFav){
      contact.isFav = false;
    } else {
      contact.isFav = true;
    }
  }

  sortContacts() {
    function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1
      }

      return 0
    }

    CONTACTS.sort(compare);
  }

  constructor(private afs: AngularFirestore, private authService: AuthService) { }
}
