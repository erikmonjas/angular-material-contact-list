import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact/contact.component';
import { ContactService } from '../services/contact.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ContactFormComponent} from '../contact-form/contact-form.component';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {
  contacts: Contact[] = [];
  favs: Contact[] = [];

  constructor(private contactService: ContactService, public dialog: MatDialog, private authService:AuthService, private afs:AngularFirestore) { }

  ngOnInit() {
    this.getAllFBContacts();
    // this.getContacts();
    // this.favs = this.contacts.filter(contact => !!contact.isFav);
  }

  // getContacts(): void {
  //   this.contactService.getContacts()
  //     .subscribe(contacts => this.contacts = contacts);
  // }

  getAllFBContacts(){
    let userUID:string;
    this.authService.getAuth().subscribe( auth => {
      if(!!auth){
        userUID = auth.uid;
        this.afs.collection(userUID).snapshotChanges().subscribe(data => {
          this.contacts = data.map(e => 
            e.payload.doc.data() as Contact
          )
          this.favs = this.contacts.filter(contact => !!contact.isFav);
          return this.contactService.sortFBContacts(this.contacts);
        })
      }
    })
  }

  // deleteContact(id){
  //   this.contactService.deleteContact(id);
  //   this.favs = this.contacts.filter(contact => !!contact.isFav);
  // }

  deleteContact(id){
    this.contactService.deleteFBContact(id);
  }

  // toggleFav(id) {
  //   this.contactService.toggleFav(id);
  //   this.favs = this.contacts.filter(contact => !!contact.isFav);
  // }

  toggleFav(id, isFav) {
    console.log(id, isFav);
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

}
