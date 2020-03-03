import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/user/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrls: ['./verifyuser.component.scss']
})
export class VerifyuserComponent implements OnInit {
  private params: Params;
  private token: string;
  constructor(private userService : UserserviceService, 
    private activatedRoute: ActivatedRoute, 
    private router:Router, 
    private _snackBar:MatSnackBar) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log("token",params.token);
      localStorage.setItem('token',params.token);
    });

    this.userService.verify()
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
          console.log("error",err.error)
          // alert(err.error.message);
          this._snackBar.open(err.error,'close')._dismissAfter(2000);
        });
  }

}
