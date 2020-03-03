import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user'
import { UserserviceService } from '../../services/user/userservice.service'
import { ActivatedRoute,Params } from '@angular/router';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide:Boolean=true;
  resetData:User = new User();
  password:any = new FormControl('',[Validators.required,Validators.pattern(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)])
  constructor(private userService : UserserviceService,
     private activatedRoute: ActivatedRoute,
     private router:Router ,
     private _snackBar:MatSnackBar) { }
  private params: Params;
  private token: string;
  getPasswordErrorMsg(){
    return this.password.hasError('required') ? 'You must enter a value' :
    this.password.hasError('pattern') ? 'Please enter only character string' :
      '';
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log("token",params.token);
      localStorage.setItem('token',params.token);
    });
  }

  save(){
    console.log("data",this.resetData);
      this.userService.reset(this.resetData)
      .subscribe(
        result =>{
            console.log("response",result)
            this.router.navigateByUrl("login").then(e => {
              if (e) {
                console.log("Navigation is successful!");
              } else {
                console.log("Navigation has failed!");
              }
            });
          this._snackBar.open('success','close')._dismissAfter(2000);
        } ,
        err => {
          console.log("error",err);
          // alert(err.error.message);
          this._snackBar.open(err,'close')._dismissAfter(2000);
        });
  }
}
