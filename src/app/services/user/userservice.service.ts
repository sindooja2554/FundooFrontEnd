import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpServiceService) { }

  registration(user)
  {
    console.log("body in service==>",user);
    return this.http.post('register', user);
  }

  login(user)
  {
    console.log("body in service==>",user)
    return this.http.post('login',user);
  }

  forgot(user)
  {
    console.log("body in service==>",user)
    return this.http.post('forgotpassword',user);
  }

  reset(user)
  {
    console.log("body in service==>",user)
    return this.http.headerPost('resetpassword',user);
  }

  verify()
  {
    console.log("body in service==>");
    return this.http.headerPost('verifyuser/:token',null);
  }

  uploadPicture(data)
  {
    console.log("body in service of upload pic",data);
    return this.http.headerPost('imageupload',data)
  }

}
