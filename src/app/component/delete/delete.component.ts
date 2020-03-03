import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note/note.service';
import { DataService } from 'src/app/services/data/data.service';

export interface DialogData {
  noteId : string
}

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent implements OnInit {

  @Output() trashEvent = new EventEmitter<null>();
  deleteValue : any;
  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public noteCards: DialogData,
    private noteService : NoteService,
    private data : DataService) { }

  ngOnInit() {
    this.data.deleteNote.subscribe(value => this.deleteValue = value);
    console.log(this.deleteValue);
    console.log("data in dialog box---------------------------->",this.noteCards)
  }

  closeDialog() {
    this.dialogRef.close();
  }

  delete() {
    console.log("data",this.noteCards);
    this.noteService.deleteNote(this.noteCards)
    .subscribe(result=>{
      console.log("response",result)
      this.dialogRef.close();
      this.data.callGetAllTrash(result);
    },
    error=>{
      console.log("error--------------->",error);
    })
  }
}
