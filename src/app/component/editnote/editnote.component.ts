import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
// import { Note } from '../../models/note'
import { NoteService } from '../../services/note/note.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotecardComponent } from '../notecard/notecard.component';
import { DataService } from '../../services/data/data.service';
// export interface DialogData {
//   title: string;
//   description: string;
// }

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.scss']
})


export class EditnoteComponent implements OnInit {

  title:string;
  description:string;
  remainder : Date   = null;
  color    : Object  = {
    name : this.data.name,
    code : this.data.code
  };
  isTrash  : boolean = this.data.isTrash;
  isArchived  : boolean = this.data.isArchive;
  pinToggle: boolean = this.data.isPinned;
  value:object;
  removable = true;
  labels: any;
  searchRes : any;
  reminderValue:any;
  result:any;
  labelArray : Array<any> = [];
  callingFunction:any;
  // searchRefresh : boolean = true;
  // @Output() searchRes = new EventEmitter<any>();
  constructor(
    // private note : NotecardComponent,
    // private dataService : DataService,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<EditnoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService
  ) { 
    this.title=data.title,
    this.description = data.description
  } 

  ngOnInit() {
    this.dataService.searchValue.subscribe(search => this.searchRes = search)
    this.dataService.labelInEditComponent.subscribe(data => this.labels = data)

    this.dataService.reminder.subscribe(value => this.reminderValue = value)
    this.dataService.labelsArray.subscribe(result => this.result = result);
    this.dataService.label.subscribe(value => this.labelArray = value);
    // this.dataService.editDialog.subscribe(value => this.callingFunction = value)

    this.remainder =  null;
    this.color    = {
      name : this.data.color.name,
      code : this.data.color.code
    };
    this.isTrash = this.data.isTrash;
    this.isArchived  = this.data.isArchive;
    this.pinToggle= this.data.isPinned;
    console.log(this.color);
  }

  setReminder($event) {
    this.remainder = $event;
    this.data.remainder = this.remainder;
    console.log(this.remainder);
    this.noteService.setRemainder(this.remainder, this.data)
    .subscribe(result => {
      console.log("result====================>", result);
      // this.reminderEvent.emit(null);
    },
      err => {
        console.log("error", err)
      });
  }

  setColor($event) {
    this.color = $event;
    console.log("color",this.color)
    this.data.color = this.color;
    console.log(this.color);
  }

  addToTrash($event) {
    this.isTrash = $event;
    this.pinToggle = false;
    this.isArchived = false;
    this.remainder = null;
    console.log(this.isTrash);
    if(this.isTrash === true) {
      this.editNote()
    }
  }

  archived($event) {
    // console.log(this.isArchived);
    this.isArchived = $event ||this.isArchived;
    this.pinToggle = false;
    this.isTrash = false;
    console.log(this.isArchived);
    this.dialogRef.close();
    this.editNote();
  }

  unarchive($event) {
    this.isArchived = $event ||this.isArchived;
    console.log(this.isArchived);
  }

  pinned() { 
    this.pinToggle = true;
    this.isArchived = false;
    this.isTrash = false;
    console.log(this.pinToggle);
    this.data.isPinned = this.pinToggle;
  }

  unpinned() {
    this.pinToggle = false;
    console.log(this.pinToggle);
    this.data.isPinned = this.pinToggle;
  }

  // removeReminder() {
  //   this.remainder = null;
  //   console.log(this.remainder);
  // }

  resetValues() {
    this.remainder = null;
    this.color     = {
      name : this.data.name,
      code : this.data.code
    };
    this.isTrash =  this.data.isTrash;
    this.isArchived =  this.data.isArchive;
    this.pinToggle  =  this.data.isPinned;
    this.data.title = "";
    this.data.description = "";
  }

  // setReminder($event) {
  //   this.reminder = $event;
  //   console.log("data in set reminder", this.reminder);
  // }

  removeReminder() {
    // console.log("in remove")
    this.remainder = null;
    this.noteService.removeReminder(this.data)
      .subscribe(result => {
        console.log("response==============>", result);
        this.dataService.changeReminder('');
      },
        error => {
          console.log("error------------>", error)
        });
  }

  editNote() {
    this.dialogRef.close();
    console.log(this.color);
    this.value = {
     title: this.title,
     description: this.description,
     color: this.color,
     isTrash: this.isTrash,
     isArchive: this.isArchived,
     isPinned: this.pinToggle,
    }
    console.log("data array",this.value);
    this.noteService.editNote(this.value,this.data)
      .subscribe(
        result => {
          console.log("response", result);
          this.dataService.searchData(this.searchRes)
          this.dataService.changeReminder('');
        },
      err => {
        console.log("error", err)
      });
  }

  addLabelOrRemoveLabel(item:any) {
    if(item.value === true) {
      this.data.labels.push(item.labels)
      console.log("event ocurred in app-icon",item.labels);
      let addLabelToNoteObject = {
        labels : item.labels,
        noteId  : this.data._id
      }
      this.noteService.addLabelToNote(addLabelToNoteObject)
    .subscribe((result:any)=>{
      // this.data.labels.push(result.data.labels)
      // this.dataService.callUpdateNote(result.data);
      console.log("response========================>",result)
      // this.reminderEvent.emit(null); 
    },
    error=>{
      console.log("errorrrr======>",error);
    })
    } else {
    let  index = this.data.labels.map(function(item) {
        return item.Id
    }).indexOf(item.labels._id);
    console.log("index------------>",index);
    this.data.labels.splice(index, 1);
    console.log("updated data===============>",this.data.labels);
      let removeLabelObject = {
        labelId : item.labels._id,
        label   : item.labels.label,
        noteId  : this.data._id,
      }
      this.noteService.removeLabel(removeLabelObject)
      .subscribe((result:any)=>{
        console.log("response-------------------------->",result)
        this.dataService.callLabels(result.data);
        // this.reminderEvent.emit(null); 
      },
      error =>{
        console.log("error------------------------------->",error)
      })
    }
    // this.dataService.addLabelInEditComponent(item);
  } 

  removeLabel(label) {
    let  index = this.data.labels.map(function(item) {
      return item.Id
  }).indexOf(label._id);
  console.log("index------------>",index);
  this.data.labels.splice(index, 1);
  console.log("updated data===============>",this.data.labels);
    console.log("label",label);
    let labelObject = {
      label:label.label,
      noteId:this.data._id,
      labelId:label._id
    }
    this.noteService.removeLabel(labelObject)
    .subscribe(result=>{
      console.log("response in remove Label===========>",result);
      // this.reminderEvent.emit(null);
    },
    error=>{ 
      console.log("errorrrr======>",error);
    })
  }
}
