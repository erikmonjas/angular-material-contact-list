import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { ContactService } from '../services/contact.service';
import { ModalComponent } from '../modal/modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
    notes: ['']
  });

  constructor(private fb: FormBuilder, private ngZone: NgZone, private contactService: ContactService, public dialogRef: MatDialogRef<ContactFormComponent>) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
  }

  onSubmit() {
    const contact = this.contactData.value;
    contact.id = new Date().getTime();
    this.contactService.createContact(contact);
    this.contactData.reset();
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
