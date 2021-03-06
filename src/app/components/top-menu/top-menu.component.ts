import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ContactService } from "../../services/contact.service";

@Component({
  selector: "top-menu",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent implements OnInit {
  showingAll: boolean = true;
  showingFavs: boolean = false;
  @Output() favsView = new EventEmitter<boolean>();

  constructor(private contactService: ContactService) {}

  ngOnInit() {}

  showAll() {
    this.showingAll = true;
    this.showingFavs = false;
    this.contactService.setSearchValue("");
    this.favsView.emit(false);
  }

  showFavs() {
    this.showingAll = false;
    this.showingFavs = true;
    this.contactService.setSearchValue("");
    this.favsView.emit(true);
  }
}
