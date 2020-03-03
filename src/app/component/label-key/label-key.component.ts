import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { NoteService } from 'src/app/services/note/note.service';
import { ActivatedRoute } from '@angular/router';

// interface ParamMap {
//   keys: string[]
//   has(name: string): boolean
//   get(name: string): string | null
//   getAll(name: string): string[]
// }

@Component({
  selector: 'app-label-key',
  templateUrl: './label-key.component.html',
  styleUrls: ['./label-key.component.scss']
})
export class LabelKeyComponent implements OnInit {

  key:any;
  clicked:boolean;
  searchNoteByLabel:Array<any> = [];
  param:any;
  constructor(
    private router : ActivatedRoute,
    private data: DataService,
    private note: NoteService
  ) { }

  ngOnInit() {
    this.data.searchLabels.subscribe(searchLabel => this.key = searchLabel);
    this.router.paramMap.subscribe(params => {
      console.log("key--------------->",params.get("key"))
      this.param=params.get("key");
      this.getAllNotesWithLabelId();
      });

    this.data.currentMessage.subscribe(message => this.clicked = message);
  }

  getAllNotesWithLabelId() {
    console.log("labelObject",this.param);
    this.note.getAllNotes()
    .subscribe((result:any)=>{      
      (result.data).map(key => {
        if(key.labels !== null && key.labels !== undefined) {
          (key.labels).map((index)=>{
            if(index.label === this.param) {
              console.log(key);
              this.searchNoteByLabel.push(key);
            }
          })
        }
      })
      // this.data.searchLabel('');
    },
    error=>{
      console.log("error-------------------------->",error);
    })
    this.searchNoteByLabel=[];
  }
}
