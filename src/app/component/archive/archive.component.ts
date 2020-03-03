import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note/note.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  data: Array<any> = [];
  clicked:boolean;
  constructor( 
    private noteService: NoteService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.clicked = message);
    this.getAllArchive();
  }

  getAllArchive(){
    this.noteService.getAllNotes()
      .subscribe(
        result => {
          var responses:any = result;
          console.log("res==============>",responses.data[0].isTrash)
          let j=0;
          for (let i = 0; i < responses.data.length; i++) {
            if (responses.data[i].isArchive !== false) {
              this.data[j] = responses.data[i];
              j++;
            }
          }
          console.log("data===>", this.data.reverse());
        }
      )
      this.data = [];
  }

  // ngAfterViewChecked() {
  //   console.log("lifecycle hook called")
  //   this.getAllArchive();
  // }

}
