import { Injectable } from "@angular/core";
// import { AngularFireDatabase } from "angularfire2/database";
// import { AngularFireAuth } from "angularfire2/auth";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

import * as firebase from 'firebase/app'
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
// import { take } from "rxjs/operators";

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  messaging;
  constructor() { 
  try{
  firebase.initializeApp({
    'messagingSenderId': environment.firebase.messagingSenderId,
    'projectId': environment.firebase.projectId,
    'apiKey': environment.firebase.apiKey,
    'authDomain': environment.firebase.authDomain,
    'databaseURL': environment.firebase.databaseURL,
    'storageBucket': environment.firebase.storageBucket,
    'appId': environment.firebase.appId,
    'measurementId': environment.firebase.measurementId
  });
  this.messaging = firebase.messaging();
  }catch(err){    
  console.error('Firebase initialization error', err);
  }
  }
  
  /**
  * request permission for notification from firebase cloud messaging
  * 
  * @param userId userId
  */
  getPermission() {
  this.messaging.requestPermission()
  .then(() => {
  return this.messaging.getToken()
  })
  .then(token => {
  console.log(token)
  })
  .catch((err) => {
  console.log('Unable to get permission to notify.', err);
  });
  }
  receiveMessage() {
  this.messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  this.currentMessage.next(payload)
  });
  }
}
