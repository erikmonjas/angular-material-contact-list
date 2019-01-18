import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue = this.fb.group({
    search: ['']
  });

  constructor(private contactService:ContactService, private fb:FormBuilder) { }

  ngOnInit() {
  }

  onInput(){
    this.contactService.setSearchValue(this.searchValue.value.search);
  }

}
