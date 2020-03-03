import { Component, OnInit } from '@angular/core';
import { MessagingService } from './services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  ,
  providers:[MessagingService]
})
export class AppComponent implements OnInit{
  title = 'fundooDemo';
  message:any;

  constructor( 
     private msgService : MessagingService
    ) { }

  ngOnInit() {
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    this.message = this.msgService.currentMessage
  }
}
