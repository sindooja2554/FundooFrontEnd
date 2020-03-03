import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from "@angular/core";
import { Router } from "@angular/router";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { DataService } from "../../services/data/data.service";
import { NotecardComponent } from "../notecard/notecard.component";
import { MatDialog } from "@angular/material/dialog";
import { UploadProfileComponent } from "../upload-profile/upload-profile.component";
import { NoteService } from "src/app/services/note/note.service";
import { EditLabelComponent } from "../edit-label/edit-label.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})

export class DashboardComponent implements OnInit {
  // public imageUrl;
  clicked: boolean;
  showNotes: boolean;
  showRemainders: boolean;
  opened: boolean = true;
  imageUrl: any;
  image: any;
  firstName: any;
  lastName: any;
  email: any;
  noteToggle: boolean = true;
  searchValue: string;
  responseArray: Array<any> = [];
  reminder: boolean = false;
  note: boolean = true;
  archiveclicked: boolean = false;
  trashClicked: boolean = false;
  fullName: string;
  labelArray: Array<any>;
  cancel: boolean = true;
  key:any;
  label:boolean = false;
  initial : string;
  colorBackground : string;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private data: DataService,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.data.currentMessage.subscribe(message => (this.clicked = message));
    this.data.searchValue.subscribe(search => (this.searchValue = search));
    this.data.labelsArray.subscribe(labelArray => {
      this.getAllLabels();
    });
    this.data.searchLabels.subscribe(searchLabel => this.key = searchLabel);
    this.imageUrl = localStorage.getItem("imageUrl");
    var firstName = localStorage.getItem("firstName");
    this.firstName = firstName.replace(/^"?(.+?)"?$/, "$1");
    var lastName = localStorage.getItem("lastName");
    this.lastName = lastName.replace(/^"?(.+?)"?$/, "$1");
    var email = localStorage.getItem("email");
    this.email = email.replace(/^"?(.+?)"?$/, "$1");
    this.fullName = localStorage.getItem("fullName");
    this.colorBackground = localStorage.getItem("colorBackground");
    this.initial = this.fullName[0];
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("login").then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  handleKeyDown(event: any) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  onClickSearchView() {
    this.cancel = false;
    this.router.navigate(["/home/search"]).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  onClickView() {
    this.data.changeMessage(!this.clicked);
  }

  notesRecalling() {
    this.searchValue = "";
    this.data.searchData("");
    this.notes();
  }

  notes() {
    this.cancel = true;
    this.noteToggle = false;
    this.note = true;
    this.reminder = false;
    this.archiveclicked = false;
    this.trashClicked = false;
    this.label = false;
    this.searchValue = "";
    this.data.searchData("");
  }

  remainder() {
    this.reminder = true;
    this.note = false;
    this.archiveclicked = false;
    this.trashClicked = false;
    this.label = false;
    this.searchValue = "";
    this.data.searchData("");
  }

  trash() {
    this.reminder = false;
    this.note = false;
    this.archiveclicked = false;
    this.trashClicked = true;
    this.label =false;
    this.searchValue = "";
    this.data.searchData("");
  }

  archive() {
    this.reminder = false;
    this.note = false;
    this.archiveclicked = true;
    this.trashClicked = false;
    this.label =false;
    this.searchValue = "";
    this.data.searchData("");
  }

  openDialog() {
    this.dialog.open(UploadProfileComponent, {
      data: { imageUrl: this.imageUrl }
    });
  }

  search() {
    this.cancel = false;
    console.log("before ", this.searchValue);
    this.data.searchData(this.searchValue);
    console.log("search element.....", this.searchValue);
  }

  getAllLabels() {
    console.log("called get");
    this.noteService.getAllLabels().subscribe(
      (result: any) => {
        console.log("got response");
        this.data.labelChange(result.data);
        this.responseArray = result.data;
        console.log("assigned response");
      },
      err => {
        console.log("error", err);
      }
    );
  }

  editLabel() {
    this.dialog.open(EditLabelComponent);
  }

  getNotesByLabel(label) {
    this.label = true;
    this.reminder = false;
    this.note = false;
    this.archiveclicked = false;
    this.trashClicked = false;
    let key = label.label
    this.searchValue = "";
    this.data.searchData("");
    this.data.searchLabel(key);
    this.router.navigate(["home/label/"+key])
  }
}
