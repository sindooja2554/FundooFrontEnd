import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserserviceService } from 'src/app/services/user/userservice.service';

export interface DialogData { 
  imageUrl:any
}

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.scss']
})
export class UploadProfileComponent implements OnInit {

  // @Output() uploadImage = new EventEmitter<string>();
  // fileLocation ;
  image: File;
  // resData: any;
  imageUrl:any
  selectedFile = null;
  constructor(
    private userService: UserserviceService,
    public dialogRef: MatDialogRef<UploadProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  cancel()
  {
    this.dialogRef.close()
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  setProfilePicture()
  {
    // const formData = new FormData();
    // formData.append('request',this.fileLocation);
    // console.log("file=============>",formData);
    const payload = new FormData();
    // payload.append('name', this.name);
    payload.append('image', this.selectedFile, this.selectedFile.name);
    console.log("image",payload);
    this.userService.uploadPicture(payload)
      .subscribe(
        result => {
          var array: any = result;
          console.log("result====================>",array);
          this.imageUrl = array.data.replace(/^"?(.+?)"?$/,'$1')
          localStorage.setItem('imageUrl', this.imageUrl);
          // this.uploadImage.emit(imageUrl);
        },
        err => {
          console.log("error", err.error)
        });
  }
}
