import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { NoteService } from 'src/app/services/note/note.service';
import { DeleteComponent } from '../delete/delete.component';

// export interface DialogData {
//   title: string;
//   description: string;
// }

@Component({
  selector: 'app-edit-trash',
  templateUrl: './edit-trash.component.html',
  styleUrls: ['./edit-trash.component.scss']
})
export class EditTrashComponent implements OnInit {

  @Output() trashEvent = new EventEmitter<null>();

  constructor(
    public dialogRef: MatDialogRef<EditTrashComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public noteService:NoteService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    console.log("edit",this.data)
  }

  restore() {
    this.data.isTrash =false;
    console.log("data====>",this.data);
    this.noteService.edit(this.data)
    .subscribe(result=>{
      console.log("response",result);
      this.trashEvent.emit(null);
    },
    error=>{
      console.log("error",error);
    })
  }

  openDialogToDelete(noteCards) {
    console.log(noteCards)
    this.dialogRef.close();
    this.dialog.open(DeleteComponent, {
      data: noteCards
    });

  }
}
