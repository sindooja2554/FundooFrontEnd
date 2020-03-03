import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  data: Array<any> = [];
  clicked: boolean;

  constructor(
    private noteService: NoteService,
    private dataService:DataService
  ) { }

  ngOnInit() {
    console.log("in trash component")
    this.dataService.currentMessage.subscribe(message => this.clicked = message);
    this.dataService.deleteNote.subscribe(value =>{
      console.log("calling get all trash");
      this.getAllTrash();
    });
    this.getAllTrash();
  }

  getAllTrash(){
    this.noteService.getAllNotes()
      .subscribe(
        result => {
          var responses:any = result;
          console.log("res==============>",responses.data[0].isTrash)
          let j=0;
          for (let i = 0; i < responses.data.length; i++) {
            if (responses.data[i].isTrash !== false) {
              this.data[j] = responses.data[i];
              j++;
            }
          }
          console.log("data===>", this.data.reverse());
        }
      )
      this.data = [];
  }


}
