import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { AuthService } from '../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactData = this.fb.group({
    name: ['', Validators.required],
    email: [''],
    phone: [''],
    address: [''],
    notes: [''],
    isFav:[false]
  });

  contactObject:any;

  contactWithoutId:any;

  constructor(private fb: FormBuilder, private ngZone: NgZone, private contactService: ContactService, public dialogRef: MatDialogRef<ContactFormComponent>, private authService:AuthService, private afs:AngularFirestore) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
    this.contactObject = this.contactService.contactForDialog.value;

    if(!!this.contactObject){
      this.contactWithoutId = {name: this.contactObject.name, email: this.contactObject.email, phone: this.contactObject.phone, address: this.contactObject.address, notes: this.contactObject.notes, isFav: this.contactObject.isFav};
      
      this.contactData.setValue(this.contactWithoutId);
    }

    // this.getContact();
    // if(!!this.contactObject){
    //   this.contactWithoutId = {name: this.contactObject.name, email: this.contactObject.email, phone: this.contactObject.phone, address: this.contactObject.address, notes: this.contactObject.notes, isFav: this.contactObject.isFav};
      
    //   this.contactData.setValue(this.contactWithoutId);
    // }
  }

  // ngOnDestroy() {
  //   this.contactService.emptyContactId();
  // }

  ngOnDestroy(){
    this.contactService.emptyContactForDialog();
  }

  onSubmit() {
    if (!this.contactObject){
      const contact = this.contactData.value;
      // contact.id = new Date().getTime();
      // this.contactService.createContact(contact);
      this.contactService.createFBContact(contact);
    } else {
      // this.contactService.updateContact(this.contactObject.id, this.contactData.value);
      this.contactService.updateFBContact(this.contactObject.id, this.contactData.value)
    }
    this.contactData.setValue({
      name: '', 
      email: '', 
      phone: '',
      address: '',
      notes: '',
      isFav: false
    });
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // getContact(): void {
  //   this.contactService.getContact(this.contactService.contactId.value)
  //     .subscribe(contact => this.contactObject = contact);
  // }

  getContact(){
    let thisContactID = this.contactService.contactId;
    let userUID:string;
    let contacts:object[];
    this.authService.getAuth().subscribe( auth => {
      if(!!auth){
        userUID = auth.uid;
        this.afs.collection(userUID).snapshotChanges().subscribe(data => {
          contacts = data.map(e => 
            e.payload.doc.data()
          )
          this.contactObject = contacts.find(contact => contact.id == thisContactID.value);
          return this.contactObject;
        })
      }
    })
  }

  toggleFav(){
    this.contactData.value.isFav = !this.contactData.value.isFav;
  }
}
