import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-list';
  favsView:boolean;

  favsEvent(value) {
    this.favsView = value;
  }
}
