import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { MatDialog } from '@angular/material';
import { EditTrashComponent } from '../edit-trash/edit-trash.component';
import { NoteService } from 'src/app/services/note/note.service';
import { error } from 'protractor';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-display-trash',
  templateUrl: './display-trash.component.html',
  styleUrls: ['./display-trash.component.scss']
})
export class DisplayTrashComponent implements OnInit {

  // data: Array<any> = [];
  @Input() noteCards;
  @Output() trashEvent = new EventEmitter<null>();
  clicked: boolean;

  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private noteService : NoteService
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.clicked = message)
  }

  trashNote(noteCards) {
    this.dialog.open(EditTrashComponent, {
      data: noteCards
    })
  }

  openDialogToDelete(noteCards) {
    console.log(noteCards)
    this.dialog.open(DeleteComponent, {
      data: noteCards
    });
  }

  // deleteNote() {
  //   console.log("data",this.noteCards);
  //   this.noteService.deleteNote(this.noteCards)
  //   .subscribe(result=>{
  //     console.log("response",result)
  //     this.trashEvent.emit(null);
  //   },
  //   error=>{
  //     console.log("error--------------->",error);
  //   })
  // }

  restore() {
    this.noteCards.isTrash =false;
    console.log("data====>",this.noteCards);
    this.noteService.edit(this.noteCards)
    .subscribe(result=>{
      console.log("response",result);
      this.trashEvent.emit(null);
    },
    error=>{
      console.log("error",error);
    })
  }

}