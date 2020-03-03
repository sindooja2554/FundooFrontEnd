import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note/note.service'
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {

  data: Array<any> = [];
  clicked: boolean;
  constructor(
    private noteService: NoteService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.clicked = message);
    this.getAllReminder();
    this.dataService.reminder.subscribe(value => {
      console.log("calling get all reminders")
      this.getAllReminder();
    })

  }

  receiveMessage() {
    console.log(" getall notes called");
    this.getAllReminder();
  }

  getAllReminder()
  {
    this.noteService.getAllNotes()
      .subscribe(
        (result:any) => {
          var responses:any = result;
          console.log("res==============>",responses.data[0].isTrash)
          let j=0;
          for (let i = 0; i < responses.data.length; i++) {
            if (responses.data[i].remainder !== null) {
              this.data[j] = responses.data[i];
              j++;
            }
          }
          console.log("data===>", this.data.reverse());
        }
      )
      this.data=[];
  }

}
