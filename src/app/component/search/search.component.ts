import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { NoteService } from 'src/app/services/note/note.service';
import { error } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  clicked: boolean;
  searchValue: string;
  searchData: Array<any> = [];
  searchRes: boolean;

  constructor(
    private data: DataService,
    private noteService: NoteService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.clicked = message);
    this.data.searchValue.subscribe(search => {
      this.search(search);
    })
    console.log("search data",this.searchData)
    // this.data.search.subscribe(value => this.search(null) )

    console.log("data in search component", this.searchValue);
    // this.data.search.subscribe(searchData =>this.searchRes=searchData)
    // this.search();
    console.log("in search")
    // if(this.searchRes == false) {
    //   this.search();
    // }
  }

  // ngAfterContentChecked() {
  //   console.log("in search component again");
  //   if(this.searchRes === false) {
  //     this.search();
  //   }
  // }
  // callingSearch() {
  //   console.log("in calling search function");
  //   this.search();
  // }

  search(item: any) {
    // this
    if (item.length != 0) {

      let request = {
        value: item
      }

      this.noteService.search(request)
        .subscribe((result: any) => {
          console.log("result in search component", result.data);
          this.searchData = result.data
          console.log("data in getall notes===>", this.searchData);
        },
          error => {
            console.log("error------->", error);
          })
      this.searchData = [];
      // console.log(this.searchData);
    }
    else{
      console.log("No search value")
    }
  }

}
