import { Component, OnInit } from "@angular/core";
import { Contact } from "../contact/contact.component";
import { ContactService } from "../../services/contact.service";
import { AuthService } from "../../services/auth.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"]
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  contactsToShow: Contact[] = [];
  searchValue: string = "";

  constructor(
    private contactService: ContactService,
    public dialog: MatDialog,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.contactService.getAllFBContacts();
    this.contactService.contacts.subscribe(
      contacts => (this.contacts = contacts)
    );
    this.filterContacts();
  }

  deleteContact(id) {
    this.contactService.deleteFBContact(id);
  }

  toggleFav(id, isFav) {
    this.contactService.toggleFBFav(id, isFav);
  }

  openDialog(id): void {
    let thisContact = this.contacts.find(contact => contact.id == id);
    this.contactService.contactDataForDialog(thisContact);
    if (window.innerWidth < 768) {
      const dialogRef = this.dialog.open(ContactFormComponent, {
        width: "80vw"
      });
    } else {
      const dialogRef = this.dialog.open(ContactFormComponent, {
        width: "60vw"
      });
    }
  }

  filterContacts(): void {
    this.contactService.searchValue.subscribe(searchValue => {
      this.searchValue = searchValue.toLowerCase();
      this.contacts.map(contact => {
        const contactObject = contact;
        if (contact.name.toLowerCase().includes(searchValue.toLowerCase())) {
          if (
            !!this.contactsToShow.find(
              contact => contact.id == contactObject.id
            )
          ) {
            return false;
          } else {
            this.contactsToShow.push(contactObject);
            return this.contactService.sortFBContacts(this.contactsToShow);
          }
        } else {
          if (
            !!this.contactsToShow.find(
              contact => contact.id == contactObject.id
            )
          ) {
            const indexOfContactToDelete = this.contactsToShow.indexOf(contact);
            this.contactsToShow.splice(indexOfContactToDelete, 1);
            return this.contactService.sortFBContacts(this.contactsToShow);
          } else {
            return false;
          }
        }
      });
    });
  }
}
