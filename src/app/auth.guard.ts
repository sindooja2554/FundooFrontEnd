import { Injectable } from '@angular/core';
// import { AuthService } from './../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token:string;
  isLoggedIn:boolean = true;
  constructor()
  {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = localStorage.getItem('token');
      console.log("authgaurd",this.token);
      if(this.token !== null)
        return this.isLoggedIn;
  }
  
}
