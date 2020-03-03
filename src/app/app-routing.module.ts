import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component'
import { LoginComponent } from './component/login/login.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { VerifyuserComponent } from './component/verifyuser/verifyuser.component';
import { NoteComponent } from './component/note/note.component';
import { UploadProfileComponent } from './component/upload-profile/upload-profile.component';
import { NotecardComponent } from './component/notecard/notecard.component'
import { EditnoteComponent } from './component/editnote/editnote.component';
import { RemainderComponent } from './component/remainder/remainder.component';
import { TrashComponent } from './component/trash/trash.component';
import { EditTrashComponent } from './component/edit-trash/edit-trash.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { SearchComponent } from './component/search/search.component'
import { DeleteComponent } from './component/delete/delete.component';
import { EditLabelComponent } from './component/edit-label/edit-label.component';
import { LabelKeyComponent } from './component/label-key/label-key.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component: LoginComponent, },
  {path:'registration',component: RegistrationComponent},
  {path:'forgotpassword',component: ForgotPasswordComponent},
  {path:'resetpassword/:token',component: ResetPasswordComponent},
  {path:'verifyuser/:token',component:VerifyuserComponent},
  {path:'home', component: DashboardComponent ,canActivate:[AuthGuard],
    children:[
        {path:'', redirectTo:'/note', pathMatch:'full'},
        {path:'note',component: NotecardComponent},
        {path:'editnote',component: EditnoteComponent},
        {path:'reminder',component: RemainderComponent},
        {path:'trash',component: TrashComponent},
        {path:'edittrash',component: EditTrashComponent},
        {path:'archive',component: ArchiveComponent},
        {path:'search',component: SearchComponent},
        {path:'deletenote',component: DeleteComponent},
        {path:'editlabel',component:EditLabelComponent},
        {path:'label/:key',component: LabelKeyComponent}
    ]},
  // {path:'note',component:NoteComponent},
  {path:'uploadprofile',component:UploadProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
