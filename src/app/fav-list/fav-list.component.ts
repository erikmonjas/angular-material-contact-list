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
  contactsToShow: Contact[] = [];
  searchValue:string;

  constructor(private contactService: ContactService, public dialog: MatDialog, private authService:AuthService, private afs:AngularFirestore) { }

  ngOnInit() {
    this.getAllFBContacts();
    this.filterContacts();
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
          return this.contactService.sortFBContacts(this.favs);
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

  filterContacts(): void {
      this.contactService.searchValue.subscribe(searchValue => {
        this.searchValue = searchValue;
        if (this.searchValue.length < 1){
          this.contactService.sortFBContacts(this.favs);
        } else {
          this.favs.map(contact => {
            const contactObject = contact;
            if (contact.name.toLowerCase().includes(searchValue)){
              if(!!this.contactsToShow.find(contact => contact.id == contactObject.id)){
                return false
              } else {
                this.contactsToShow.push(contactObject)
                return this.contactService.sortFBContacts(this.contactsToShow);
              }
            } else {
              if(!!this.contactsToShow.find(contact => contact.id == contactObject.id)){
                const indexOfContactToDelete = this.contactsToShow.indexOf(contact);
                this.contactsToShow.splice(indexOfContactToDelete, 1);
                return this.contactService.sortFBContacts(this.favs);
              } else {
                return false
              }
            }
          });
        }
      });
  }

}
