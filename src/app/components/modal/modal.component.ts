import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ContactFormComponent } from "../contact-form/contact-form.component";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
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
}
