import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from '../../services/note/note.service'
// import { UserserviceService } from 'src/app/services/user/userservice.service';
import { DataService } from 'src/app/services/data/data.service';
import { MatCheckboxChange } from '@angular/material';
import { error } from 'protractor';

@Component({
  selector: 'app-note-icon',
  templateUrl: './note-icon.component.html',
  styleUrls: ['./note-icon.component.scss']
})

export class NoteIconComponent implements OnInit {
  @Input() noteCards  
  @Input() isArchived;
  @Output() reminder = new EventEmitter<Date>();
  @Output() colorEvent = new EventEmitter<string>();
  @Output() delete = new EventEmitter<boolean>();
  @Output() archive = new EventEmitter<boolean>();
  @Output() unArchived = new EventEmitter<boolean>();
  @Output() labelled = new EventEmitter<any>();
  @Output() createLabelEvent = new EventEmitter<string>();
  @Output() setVisibilityEvent = new EventEmitter<boolean>();

  color: Array<any>
  noteDelete: boolean = false;
  isArchive:boolean = true;
  dateTimeRange: Date = null;
  chooseColor: boolean = true;
  min: Date = new Date();
  responseArray: Array<any> = [];
  labelClicked :boolean = false;
  show : boolean = true;
  labelArray : Array<any> = []
  createLabel : string;
  // visible: boolean;

  constructor(
    private data: DataService,
    private noteService: NoteService
  ) {
    this.color = [
      { code: "#FFFFFF", name: "white" },
      { code: "#F28B82", name: "red" },
      { code: "#F7BC04", name: "orange" },
      { code: "#FCF474", name: "yellow" },
      { code: "#CCFF90", name: "green" },
      { code: "#A7FFEB", name: "teal" },
      { code: "#CBF0F8", name: "blue" },
      { code: "#AECBFA", name: "Drak blue" },
      { code: "#D7AEFB", name: "purple" },
      { code: "#FACFE8", name: "pink" },
      { code: "#E6C9A8", name: "Brown" },
      { code: "#E8EAED", name: "grey" },
      { code: "#96A5A5", name: "Drak gray" },
      { code: "#00FFFF", name: "cyan" }
    ]
  }

  ngOnInit() {
    this.data.label.subscribe(value => this.labelArray = value)
  }

  // setVisibility() {
  //   console.log("called set visibility");
  //   this.visible = true;
  //   this.setVisibilityEvent.emit(this.visible);
  // }

  deleteNote() {
    this.noteDelete = true;
    this.delete.emit(this.noteDelete);
  }

  callReminder() {
    this.reminder.emit(this.dateTimeRange);
  }

  setColor(color) {
    this.colorEvent.emit(color);
  }

  archived() {
    this.archive.emit(this.isArchive);
  }

  unArchive() {
    this.isArchive = false
    this.unArchived.emit(this.isArchive);
  }

  changeLabel(event : MatCheckboxChange,label:any) {
    this.labelled.emit({value:event.checked,labels:label});
  }

  getCheck(item:any){
    return this.noteCards.labels.find((choice:any)=>choice._id===item._id)
  }

  createLabelOnNote(createLabel) {
    console.log("label in createLabel------------------------>",createLabel);
    this.createLabelEvent.emit(createLabel)
  }
}
