import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  labelValue : any;
  searchVal : any;
  deleteValue : any;
  addlabel : any;
  data:any;
  private messageSource = new BehaviorSubject(true);
  private searchSource = new BehaviorSubject('');
  private labels = new BehaviorSubject(this.labelValue);
  private labelArr = new BehaviorSubject(this.labelValue);
  private deleteSource = new BehaviorSubject(this.deleteValue);
  private addLabelInEdit = new BehaviorSubject(this.addlabel);
  private reminderSource = new BehaviorSubject('');
  private searchLabelSource = new BehaviorSubject(this.data);

  currentMessage = this.messageSource.asObservable();
  searchValue = this.searchSource.asObservable();
  labelsArray = this.labels.asObservable();
  label = this.labelArr.asObservable();
  deleteNote = this.deleteSource.asObservable();
  labelInEditComponent = this.addLabelInEdit.asObservable();
  reminder = this.reminderSource.asObservable();
  searchLabels = this.searchLabelSource.asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    console.log("from dataservice===",message);
    this.messageSource.next(message);
  }

  searchData(search : string) {
    console.log("in data service",search);
    this.searchSource.next(search);
  }

  callLabels(value:any){
    console.log("In data service",value)
    this.labels.next(value);
  }

  labelChange(labelArr:any) {
    console.log("in data service",labelArr);
    this.labelArr.next(labelArr)
  }

  callGetAllTrash(value:any) {
    console.log("in data service",value);
    this.deleteSource.next(value)
  }

  addLabelInEditComponent(data:any) {
    console.log(data);
    this.addLabelInEdit.next(data);
  }

  changeReminder(data:any) {
    console.log("in data service",data)
    this.reminderSource.next(data);
  }

  searchLabel(data:any) {
    this.searchLabelSource.next(data);
  }
}
