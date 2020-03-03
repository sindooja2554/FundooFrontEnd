import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VerifyuserComponent } from './component/verifyuser/verifyuser.component'
import {MatSnackBarModule} from "@angular/material";
import { NoteComponent } from './component/note/note.component';
import { NotecardComponent } from './component/notecard/notecard.component';
import { NoteIconComponent } from './component/note-icon/note-icon.component';
import { UploadProfileComponent } from './component/upload-profile/upload-profile.component';
import { DisplayComponent } from './component/display/display.component';
import { EditnoteComponent } from './component/editnote/editnote.component';
import { TrashComponent } from './component/trash/trash.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RemainderComponent } from './component/remainder/remainder.component';
import { DisplayTrashComponent } from './component/display-trash/display-trash.component';
import { EditTrashComponent } from './component/edit-trash/edit-trash.component';
import { AvatarModule } from 'ngx-avatar';
import { ArchiveComponent } from './component/archive/archive.component';
import { SearchComponent } from './component/search/search.component';
import { DeleteComponent } from './component/delete/delete.component';
import { EditLabelComponent } from './component/edit-label/edit-label.component';
import { LabelKeyComponent } from './component/label-key/label-key.component';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './services/messaging/messaging.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    VerifyuserComponent,
    NoteComponent,
    NotecardComponent,
    NoteIconComponent,
    UploadProfileComponent,
    DisplayComponent,
    EditnoteComponent,
    TrashComponent,
    RemainderComponent,
    DisplayTrashComponent,
    EditTrashComponent,
    ArchiveComponent,
    SearchComponent,
    DeleteComponent,
    EditLabelComponent,
    LabelKeyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    MatSnackBarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AvatarModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
