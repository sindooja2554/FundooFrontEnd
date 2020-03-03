import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'
import { UserserviceService } from '../../services/user/userservice.service'
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  register: User = new User();
  hide: Boolean = true;
  // ,Validators.length({min:3})
  firstName: any = new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{3,30}$')])
  lastName: any = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3)])
  email: any = new FormControl('', [Validators.required, Validators.email]);
  password: any = new FormControl('', [Validators.required, Validators.pattern(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)]);
  confirmPassword: any = new FormControl('', [Validators.required, Validators.pattern(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)]);
  constructor(private userService: UserserviceService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email ' :
        '';
  }

  getFirstNameErrorMsg() {
    return this.firstName.hasError('required') ? 'You must enter a value' :
      this.firstName.hasError('pattern') ?
        'Please enter name with minimum 3 characters' :
        '';
  }

  getLastNameErrorMsg() {
    return this.lastName.hasError('required') ? 'You must enter a value' :
      this.lastName.hasError('pattern') ? 'Please enter only character string' :
        this.lastName.hasError('minLength') ? 'Please enter more than 2 characters' :
          '';
  }

  getPasswordErrorMsg() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('pattern') ? 'Use 8 or more characters with a mix of letters, numbers & symbols' :
        '';
  }

  getConfirmPasswordErrorMsg() {
    return this.confirmPassword.hasError('required') ? 'You must enter a value' :
      this.confirmPassword.hasError('pattern') ? 'Use 8 or more characters with a mix of letters, numbers & symbols' :
        '';
  }

  passwordMatching() {
    console.log("passs", this.password);
    console.log("confirmP", this.confirmPassword);
    if (this.password.value !== this.confirmPassword.value) {
      return false;
    } else {
      return true;
    }
  }

  submit() {
    console.log("data", this.register);
    this.userService.registration(this.register)
      .subscribe(
        result => {
          console.log("response", result);
          this.router.navigateByUrl("login").then(e => {
            if (e) {
              console.log("Navigation is successful!");
            } else {
              console.log("Navigation has failed!");
            }
          });
          this._snackBar.open('success', 'close')._dismissAfter(2000);
        },
        err => {
          console.log("error", err.error)
          this._snackBar.open(err.message, 'close')._dismissAfter(2000);
        });
  }
}
