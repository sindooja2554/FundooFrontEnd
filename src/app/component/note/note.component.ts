import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note'
import { NoteService } from '../../services/note/note.service'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  clicked  : boolean = true;
  show     : boolean = true;
  noteData : Note    = new Note();
  remainder : Date   = null;
  color    : Object  = {
    name : "white",
    code : "#FFFFFF"
  };
  isTrash  : boolean = false;
  isArchived  : boolean = false;
  pinToggle: boolean = false;
  removable = true;
  noteCards = {
    title : null,
    archive : false,
    labels : [] 
  }
  // @Input('noteData') noteData : Note ;
  @Output() messageEvent = new EventEmitter();
  
  constructor(
    private noteService : NoteService
  ) { }

  ngOnInit() {
  
  }

  setReminder($event) {
    this.remainder = $event;
    console.log(this.remainder);
  }

  setColor($event) {
    this.color = $event;
    console.log(this.color);
  }

  addToTrash($event) {
    this.isTrash = $event;
    this.pinToggle = false;
    this.isArchived = false;
    this.remainder = null;
    console.log(this.isTrash);
  }

  archived($event) {
    this.isArchived = $event;
    this.pinToggle = false;
    this.isTrash = false;
    console.log(this.isArchived);
  }

  unarchive($event) {
    this.isArchived = $event;
    console.log(this.isArchived);
  }

  pinned() { 
    this.pinToggle = true;
    this.isArchived = false;
    this.isTrash = false;
    console.log(this.pinToggle);
  }


  unpinned() {
    this.pinToggle = false;
    console.log(this.pinToggle);
  }

  removeReminder() {
    this.remainder = null;
    console.log(this.remainder);
  }

  onButtonClick()
  {
    console.log("array of note",this.noteData);
    this.saveNote();
    this.clicked = true;
    return this.show;
  }

  addLabelOrRemoveLabel(item:any) {
    console.log("items in array", item.labels)
    this.noteCards.labels.push(item.labels)
  }

  resetValues() {
    this.remainder = null;
    this.color     = {
      name : "white",
      code : "#FFFFFF"
    };
    this.isTrash = false;
    this.isArchived = false;
    this.pinToggle  = false;
    this.noteData.title = "";
    this.noteData.description = "";
    this.noteCards.title = null;
    this.noteCards.labels = [];
    this.noteCards.archive = false
  }

  saveNote()
  {
    console.log("note",this.noteData);
    this.noteData.remainder = this.remainder;
    this.noteData.isPinned  = this.pinToggle;
    this.noteData.color     = this.color;
    this.noteData.isArchive = this.isArchived;
    this.noteData.isTrash   = this.isTrash ;
    this.noteData.labels    = this.noteCards.labels;
    console.log(this.noteData);      
    this.noteService.createNote(this.noteData).subscribe(result => {
        console.log("response after cxreate note", result);
        this.resetValues();
        this.messageEvent.emit()
      }
    )

  }
}
