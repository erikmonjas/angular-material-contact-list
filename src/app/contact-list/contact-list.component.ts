import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact/contact.component';
import { ContactService } from '../services/contact.service';
import { AuthService } from '../services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ContactFormComponent} from '../contact-form/contact-form.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, public dialog: MatDialog, private authService:AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
    // this.getContacts();
    this.getAllFBContacts();

    // this.contactService.pruebaCrearSubcoleccionFirestore();

    // this.afs.collection('collection').doc('parentDoc').collection('subcollection').doc('secondChildDoc').set({objectName: 'name', objectID: 'id'});

    // this.afs.collection('collection').doc('parentDoc').collection('subcollection').snapshotChanges().subscribe(data => {
    //   let subcollectionObjects = data.map(e => 
    //     e.payload.doc.data() as Contact
    //   )
    //   console.log(subcollectionObjects);
    // })



  }

  // getContacts(): void {
  //   this.contactService.getContacts()
  //     .subscribe(contacts => this.contacts = contacts);
  // }

  // deleteContact(id){
  //   this.contactService.deleteContact(id);
  // }

  deleteContact(id){
    this.contactService.deleteFBContact(id);
  }

  toggleFav(id, isFav) {
    this.contactService.toggleFBFav(id, isFav);
  }

  // openDialog(id): void {
  //   this.contactService.getContactId(id);
  //   if (window.innerWidth < 768){
  //     const dialogRef = this.dialog.open(ContactFormComponent, {
  //       width: '80vw'
  //     });
  //   } else {
  //     const dialogRef = this.dialog.open(ContactFormComponent, {
  //       width: '60vw'
  //     });
  //   }
  // }

  openDialog(id): void {
    let thisContact = this.contacts.find(contact => contact.id == id);
    this.contactService.contactDataForDialog(thisContact);
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

  getAllFBContacts(){
    let userUID:string;
    this.authService.getAuth().subscribe( auth => {
      if(!!auth){
        userUID = auth.uid;
        this.afs.collection(userUID).snapshotChanges().subscribe(data => {
          this.contacts = data.map(e => 
            e.payload.doc.data() as Contact
          )
          return this.contactService.sortFBContacts(this.contacts);
        })
      }
    })
  }

}
