import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  post(url, data) {
    console.log('data => ', data);
    console.log("url", this.baseUrl + url);
    return this.http.post(this.baseUrl + url, data);
  }

  headerPost(url, data) {

    let headers = new HttpHeaders({
      token: localStorage.getItem('token')
    })

    console.log('data123====> ', headers);

    return this.http.post(this.baseUrl + url, data, { headers });
  }

  get(url) {
    let headers = new HttpHeaders({
      token: localStorage.getItem('token')
    })
    console.log("GET token", this.baseUrl + url);
    return this.http.get(this.baseUrl + url, { headers });
  }

  put(url, data) {
    let tokens = localStorage.getItem('token')
    console.log("data======================================", data);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: tokens
    })

    return this.http.put(this.baseUrl + url, data, { headers });
  }

  delete(url) {
    let tokens = localStorage.getItem('token')
    // console.log("data======================================", data);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: tokens
    })
    return this.http.delete(this.baseUrl + url, { headers });
  }

  getSearch(url,data) {
    let headers = new HttpHeaders({
      token: localStorage.getItem('token')
    })

    console.log("GET token", this.baseUrl + url);

    return this.http.post(this.baseUrl + url, data, { headers });
  }
}
