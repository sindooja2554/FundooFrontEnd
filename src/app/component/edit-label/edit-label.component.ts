import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from '../../services/note/note.service'
import { DataService } from 'src/app/services/data/data.service';
// import { DashboardComponent } from '../dashboard/dashboard.component'

export interface DialogData {
  editlabelArray : Array <any>
}

@Component({
  selector: 'app-edit-label',
  templateUrl: './edit-label.component.html',
  styleUrls: ['./edit-label.component.scss']
})
export class EditLabelComponent implements OnInit {

  click:boolean = false;
  edit:boolean = false;
  label:string;
  value:any;
  id:string;
  labelArray : Array<any> = []
  constructor( public dialogRef: MatDialogRef<EditLabelComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public noteService:NoteService,
    public dataService:DataService) { }

  ngOnInit() {
    // console.log("data from edit", this.data);
    this.dataService.labelsArray.subscribe(value => this.value = value);
    this.dataService.label.subscribe(value => this.labelArray = value);
    console.log(this.labelArray);
  }

  toCreateLabel() {
    this.click = true;
    console.log(this.click)
  }

  cancel() {
    this.click = false;
  }

  createLabel() {
    console.log(this.label);
    this.noteService.createLabel(this.label).
    subscribe((result:any)  => {
      console.log("label created",result);
      // this.data = result.data;
      this.dataService.callLabels(result.data);
      this.label = "";
    },
    error=>{
      console.log("error",error);
    })
  }

  done() {
    this.createLabel();
    this.dialogRef.close();
  }

  deleteLabel(label) {
    this.noteService.deleteLabel(label).subscribe((result:any)=>{
      console.log("label deleted",result);
      this.dataService.callLabels(result.data.labels);
    },
    error=>{
      console.log("error",error);
    })
  }

  callingEditLabel(label) {
    this.edit = true;
    this.id = label._id;
    // console.log("edit label",label);
  }

  editLabel(label) {
    this.edit = false;
    this.id = '';
    console.log("edit label",label);
    this.noteService.editLabel(label).
    subscribe((result:any)=>{
      this.edit = false;
      console.log("response------------->",result);
    },
    error=>{
      console.log("error===============>",error);
    })
  }
}
