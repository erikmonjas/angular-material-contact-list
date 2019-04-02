import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { AuthService } from "../services/auth.service";

import { Contact } from "../components/contact/contact.component";
// import { CONTACTS } from '../mock-contacts';

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contactId = new BehaviorSubject<any>("");
  contactIdObs = this.contactId.asObservable();

  contactForDialog = new BehaviorSubject<any>("");

  searchValue = new BehaviorSubject<any>("");

  contacts = new BehaviorSubject<Contact[]>([]);

  getAllFBContacts() {
    let userUID: string;
    this.authService.getAuth().subscribe(auth => {
      if (!!auth) {
        userUID = auth.uid;
        this.afs
          .collection(userUID)
          .snapshotChanges()
          .subscribe(data => {
            const contactsToSort = data.map(
              e => e.payload.doc.data() as Contact
            );
            this.sortFBContacts(contactsToSort);
            return this.contacts.next(contactsToSort);
          });
      }
    });
  }

  createFBContact(contact): void {
    let userUID: string;
    const contactID = new Date().getTime().toString();
    contact.id = contactID;
    this.authService.getAuth().subscribe(auth => {
      if (!!auth) {
        userUID = auth.uid;
        this.afs
          .collection(userUID)
          .doc(contactID)
          .set(contact);
      }
    });
  }

  deleteFBContact(id) {
    let userUID: string;
    this.authService.getAuth().subscribe(auth => {
      if (!!auth) {
        userUID = auth.uid;
        this.afs
          .collection(userUID)
          .doc(id)
          .delete();
      }
    });
  }

  getContactId(id) {
    this.contactId.next(id);
  }

  emptyContactId() {
    this.contactId.next(undefined);
  }

  updateFBContact(id, contactData) {
    let userUID: string;
    const contactFormatted = {
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      address: contactData.address,
      notes: contactData.notes,
      isFav: contactData.isFav,
      id: id
    };
    this.authService.getAuth().subscribe(auth => {
      if (!!auth) {
        userUID = auth.uid;
        this.afs
          .collection(userUID)
          .doc(id)
          .update(contactFormatted);
      }
    });
  }

  toggleFBFav(id, isFavReceived) {
    let userUID: string;

    if (!!isFavReceived) {
      isFavReceived = false;
    } else {
      isFavReceived = true;
    }
    this.authService.getAuth().subscribe(auth => {
      if (!!auth) {
        userUID = auth.uid;
        this.afs
          .collection(userUID)
          .doc(id)
          .update({ isFav: isFavReceived });
      }
    });
  }

  sortFBContacts(contactsToSort) {
    function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    }

    contactsToSort.sort(compare);
  }

  contactDataForDialog(contactData) {
    this.contactForDialog.next(contactData);
  }
  emptyContactForDialog() {
    this.contactForDialog.next(undefined);
  }

  setSearchValue(searchValue) {
    this.searchValue.next(searchValue);
  }

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}
}
