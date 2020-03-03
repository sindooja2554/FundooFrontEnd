import { Component, OnInit, Input } from "@angular/core";
import { NoteService } from "../../services/note/note.service";
import { Note } from "src/app/models/note";
import { DataService } from "../../services/data/data.service";
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray
} from "@angular/cdk/drag-drop";


@Component({
  selector: "app-notecard",
  templateUrl: "./notecard.component.html",
  styleUrls: ["./notecard.component.scss"]
})
export class NotecardComponent implements OnInit {
  clicked: boolean;
  result: Object;
  titles: Array<string> = [];
  description: Array<string> = [];
  data: Array<any> = [];
  showNotes: boolean;
  pinnedArray: Array<any> = [];
  notesArray: Array<any> = [];
  notes: Array<any> = [];

  @Input("noteData") noteData: Note;

  constructor(
    private noteService: NoteService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // this.dataService.note.subscribe(note => this.showNotes = note);
    this.dataService.currentMessage.subscribe(
      message => (this.clicked = message)
    );

    console.log("inside onInti");
    this.getAllNotes();
  }

  receiveMessage() {
    console.log(" getall notes called");
    this.getAllNotes();
  }

  getAllNotes() {
    console.log("getAll notes is called");
    this.noteService.getAllNotes().subscribe(result => {
      let responses: any = result;
      console.log("res==============>", responses.data);
      // this.notes = responses.data;
      let j = 0;
      let k = 0;
      for (let i = 0; i < responses.data.length; i++) {
        if (
          responses.data[i].isTrash !== true &&
          responses.data[i].isArchive !== true &&
          responses.data[i].isPinned !== true
        ) {
          this.data[j] = responses.data[i];
          j++;
        }
      }
      this.data.reverse()
      Object.getOwnPropertyNames(responses.data).map(key => {
        // console.log("key-------->",key);
        if (responses.data[key].isPinned === true) {
          // console.log(responses.data[key]);
          this.pinnedArray.push(responses.data[key]);
        }
      });

      Object.getOwnPropertyNames(responses.data).map(key => {
        // console.log("key-------->",key);
        if (
          (responses.data[key].isPinned === false &&
            responses.data[key].isTrash === false &&
            responses.data[key].isArchive === true) ||
          (responses.data[key].isPinned === false &&
            responses.data[key].isTrash === true &&
            responses.data[key].isArchive === false)
        ) {
          // console.log(responses.data[key]);
          this.notes.push(responses.data[key]);
        }
      });
      console.log("After-------------->", this.notes);
    });
    this.data = [];
    this.pinnedArray = [];
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log("drop function is called");
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.pinnedArray.forEach(key => {
        this.notesArray.push(key);
      });
      this.data.forEach(key => {
        this.notesArray.push(key);
      });
      this.notes.forEach(key => {
        this.notesArray.push(key);
      })

      console.log("after merging", this.notesArray);
      this.noteService.notesequencing(this.notesArray)
      .subscribe((result:any)=>{
        console.log(result);
      },
      error=>{
        console.log(error);
      })
    } 
    // else {
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
    this.notesArray = [];
  } 
}
