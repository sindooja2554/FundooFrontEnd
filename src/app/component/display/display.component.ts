import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditnoteComponent } from '../editnote/editnote.component';
import { Note } from '../../models/note'
import { DataService } from 'src/app/services/data/data.service';
import { BehaviorSubject } from 'rxjs';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteIconComponent } from '../note-icon/note-icon.component';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { error } from 'protractor';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() noteCards;
  // @Input() pinCards;
  @Output() reminderEvent = new EventEmitter<null>();
  @Output() colorEventForDisplay = new EventEmitter<null>();
  @Output() isTrashEvent = new EventEmitter<null>();
  @Output() pinEvent = new EventEmitter<null>();
  @Output() archiveEvent = new EventEmitter<null>();

  clicked: boolean;
  changeText: boolean;
  removable = true;
  reminder: Date;
  color: Object;
  isTrash: boolean;
  pinToggle: boolean = false;
  isArchive: boolean;
  label: Object;
  notesArray:Array<any> = [];
  labelArray : Array<any> = [];
  callingFunction:any;
  // visibility:boolean = false;
  // labels: any;

  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private noteService: NoteService
  ) {
    this.changeText = false;
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.clicked = message);
    this.data.label.subscribe(value => this.labelArray = value);
    // this.data.editDialog.subscribe(value => this.UpdateNote(this.callingFunction))
    // this.data.labelInEditComponent.subscribe(data =>
    //   this.addLabelOrRemoveLabel(this.labels))
  }

  // setVisibility($event) {
  //   console.log("event",$event)
  //   this.visibility = $event;
  // }

  // show() {
  //   console.log("in func")
  //   this.visiblity = true;
  // }

  UpdateNote(noteCards) {
    console.log("note..........", noteCards);
    const dialogRef = this.dialog.open(EditnoteComponent, {
      data: noteCards
    })
    dialogRef.afterClosed().subscribe(result =>{
      this.reminderEvent.emit(null);
    })
  }

  setReminder($event) {
    this.reminder = $event;
    console.log("data in set reminder", this.reminder);
    this.noteService.setRemainder(this.reminder, this.noteCards)
      .subscribe(result => {
        console.log("result====================>", result);
        this.reminderEvent.emit(null);
      },
        err => {
          console.log("error", err)
        });
  }

  removeReminder() {
    console.log("in remove")
    this.noteService.removeReminder(this.noteCards)
      .subscribe(result => {
        console.log("response==============>", result);
        this.reminderEvent.emit(null);
      },
        error => {
          console.log("error------------>", error)
        });
  }

  setColor($event) {
    this.color = $event;
    console.log("color ====>", this.color)
    this.noteService.setColor(this.color, this.noteCards)
      .subscribe(result => {
        console.log("response-------------->", result);
        this.colorEventForDisplay.emit(null);
      },
        error => {
          console.log("error===========>", error);
        })
  }

  addToTrash($event) {
    this.isTrash = $event
    // this.data.is
    console.log("isTrash", this.isTrash);
    this.noteService.addNoteToTrash(this.isTrash, this.noteCards)
      .subscribe(result => {
        console.log("response=============>", result);
        this.isTrashEvent.emit(null);
      },
        error => {
          console.log("error=============>", error);
        })
  }

  pinned() { 
    this.pinToggle = true;
    console.log(this.pinToggle)
    this.noteCards.isPinned = this.pinToggle;
    this.noteCards.isArchive = false;
    console.log("data in display component",this.noteCards);
    this.noteService.edit(this.noteCards)
    .subscribe(result=>{
      console.log("response======>",result)
      this.pinEvent.emit(null);
    },
    error=>{
      console.log("error------------>",error);
    })
  }

  unpinned() {
    this.pinToggle = false;
    console.log(this.pinToggle)
    this.noteCards.isPinned = this.pinToggle;
    // this.noteCards.isArchive = false;
    this.noteService.edit(this.noteCards)
    .subscribe(result=>{
      console.log("response------------>",result);
      this.pinEvent.emit(null);
    },
    error=>{
      console.log("error===========>",error);
    })
  }

  archived($event) {
    this.isArchive = $event;
    console.log(this.isArchive);
    this.noteCards.isArchive = this.isArchive;
    this.noteCards.isPinned  = false;
    this.noteService.edit(this.noteCards)
      .subscribe(result => {
        console.log("response=============>", result);
        this.archiveEvent.emit(null);
      },
        error => {
          console.log("error=============>", error);
        })
  }

  unarchive($event) {
    this.isArchive = $event;
    console.log(this.isArchive);
    this.noteCards.isArchive = this.isArchive;
    this.noteService.edit(this.noteCards)
    .subscribe(result=>{
      console.log("response===========>",result);
      this.archiveEvent.emit(null);
    },
    error=>{
      console.log("error--------------->",error);
    })
  }

  removeLabel(label) {
    console.log("label",label);
    let labelObject = {
      label:label.label,
      noteId:this.noteCards._id,
      labelId:label._id
    }
    this.noteService.removeLabel(labelObject)
    .subscribe(result=>{
      console.log("response in remove Label===========>",result);
      this.reminderEvent.emit(null);
    },
    error=>{ 
      console.log("errorrrr======>",error);
    })
  }

  addLabelOrRemoveLabel(item:any) {
    if(item.value === true) {
      console.log("event ocurred in app-icon",item.labels);
      let addLabelToNoteObject = {
        labels : item.labels,
        noteId  : this.noteCards._id
      }
      this.noteService.addLabelToNote(addLabelToNoteObject)
    .subscribe(result=>{
      console.log("response========================>",result)
      this.reminderEvent.emit(null); 
    },
    error=>{
      console.log("errorrrr======>",error);
    })
    } else {
      let removeLabelObject = {
        labelId : item.labels._id,
        label   : item.labels.label,
        noteId  : this.noteCards._id,
      }
      this.noteService.removeLabel(removeLabelObject)
      .subscribe(result=>{
        console.log("response-------------------------->",result)
        this.reminderEvent.emit(null); 
      },
      error =>{
        console.log("error------------------------------->",error)
      })
    }
  } 

  drop(event: CdkDragDrop<any[]>) {
    console.log("drop function is called")
    console.log("event occurred when dropped------------------->",event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("items in array------------------>",event.container.data)
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  createNewLabel($event) {
    console.log("event in create new label------------------->",$event);
    let createNewLabelOnNoteObject = {
      label : $event,
      noteId : this.noteCards._id
    }
    this.noteService.createLabelOnNote(createNewLabelOnNoteObject)
    .subscribe((result:any)=>{
      console.log("response----------------->",result);
      this.reminderEvent.emit(null);
    },
    error=>{
      console.log("error-------------------->",error);
    })
  }
}

