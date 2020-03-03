import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user'
import { UserserviceService } from '../../services/user/userservice.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuard } from '../../auth.guard'
import { MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: User = new User();
  hide: Boolean = true;
  email: any = new FormControl('', [Validators.required, Validators.email]);
  password: any = new FormControl('', [Validators.required,
  Validators.pattern(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)])
  colorArray:Array<any>;
  colorBackground : string;
  message:any;


  constructor(private userService: UserserviceService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private Auth: AuthGuard,
    // public msgService : MessagingService
  ) { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email ' :
        '';
  }

  getPasswordErrorMsg() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('pattern') ? 'Please enter only character string' :
        '';
  }

  ngOnInit() {
    this.colorArray = [
      "#164D40", "#C2185B", "#0569F9", "#AB05F9", "#F9055E",
      "#F9A005", "#900C3F", "#FF5733", "#6105F9", "#F94F05"
    ]
    // this.msgService.getPermission()
    // this.msgService.receiveMessage()
    // this.message = this.msgService.currentMessage
  }

  handleKeyDown(event: any) {
    console.log("in function 43: ", event.target.value)
    if (event.keyCode == 13) {
      this.login();
    }
  }

  login() {
    // this.loginData.email= this.email;
    console.log("data", this.loginData);
    this.userService.login(this.loginData)
      .subscribe(
        result => {
          var array: any = result;
          console.log("response", result)
          var random = Math.floor(Math.random() * (+10 - +1) + +1); 
          console.log("random------------------->",random);
          this.colorBackground = this.colorArray[random];
          console.log(this.colorBackground);
      

          var token = array.token.replace(/^"?(.+?)"?$/, '$1');
          var imageUrl = array.data.data.imageUrl.replace(/^"?(.+?)"?$/, '$1')
          var fullName = array.data.data.firstName + " " + array.data.data.lastName;
          localStorage.setItem('fullName', fullName)
          localStorage.setItem('token', token);
          localStorage.setItem('imageUrl', imageUrl);
          localStorage.setItem('firstName', JSON.stringify(array.data.data.firstName));
          localStorage.setItem('lastName', JSON.stringify(array.data.data.lastName));
          localStorage.setItem('email', JSON.stringify(array.data.data.email));
          localStorage.setItem('colorBackground', this.colorBackground);

          console.log(localStorage.getItem('imageUrl'))
          console.log(localStorage.getItem('firstName'))
          console.log(localStorage.getItem('lastName'))
          console.log(localStorage.getItem('email'))
          console.log(localStorage.getItem('token'))
          console.log(localStorage.getItem('colorBackground'))
          
          if (this.Auth.canActivate) {
            this.router.navigateByUrl("home/note").then(e => {
              if (e) {
                console.log("Navigation is successful!");
              } else {
                console.log("Navigation has failed!");
              }
            });
            this._snackBar.open('Login Successful', 'close')._dismissAfter(2000);
          }
        },
        err => {
          console.log("error", err.error.message)
          // alert(err.error);
          this._snackBar.open(err.error.message, 'close')._dismissAfter(2000);
        });
  }
}
