import { Injectable } from '@angular/core';
import { HttpServiceService } from '../http/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpServiceService) { }

  createNote(note) {
    console.log("body in service file of note==>", note);
    return this.http.headerPost('note', note);
  }

  getAllNotes() {
    return this.http.get('note');
  }

  editNote(dataToBeUpdated, note) {
    console.log("-------------------------------------------------",dataToBeUpdated);
    note.title = dataToBeUpdated.title;
    note.description = dataToBeUpdated.description;
    note.color.name = dataToBeUpdated.color.name;
    note.color.code = dataToBeUpdated.color.code;
    note.isTrash= dataToBeUpdated.isTrash;
    note.isArchive= dataToBeUpdated.isArchive,
    note.isPinned= dataToBeUpdated.isPinned,
    // note.remainder= dataToBeUpdated.remainder,
    // note.labels= dataToBeUpdated.labels
    console.log("new data", note);
    // console.log("data in service file", note._id)
    return this.http.put('note/' + note._id, note);
  }

  setRemainder(dataToBeUpdated, data) {
    console.log("body in service in set remainder", data)
    data.remainder = dataToBeUpdated;
    console.log("data after updating in array", data.remainder);
    return this.http.headerPost('remainder/' + data._id, data)
  }

  removeReminder(data) {
    console.log("body in service",data);
    data.remainder = null;
    console.log("body after ===>",data.remainder);
    return this.http.put('remainder/'+data._id,data)
  }

  setColor(dataToBeUpdated,data) {
    console.log("body in service",data);
    data.color = dataToBeUpdated;
    console.log("color",data.color)
    return this.http.put('note/'+data._id,data)
  }

  addNoteToTrash(dataToBeUpdated ,data) {
    console.log("data in service",data);
    data.isTrash = dataToBeUpdated;
    data.isArchive = false;
    data.isPinned = false;
    data.remainder = null;
    return this.http.put('note/' + data._id, data)
  }

  edit(data) {
    console.log("data in service",data);
    return this.http.put('note/'+data._id, data)
  }

  deleteNote(data) {
    return this.http.delete('note/'+data._id)
  }

  search(data) {
    return this.http.getSearch('search',data)
  }

  getAllLabels() {
    return this.http.get('label');
  }

  removeLabel(labelObject) { 
    console.log("data",labelObject.noteId);
    console.log("data",labelObject.label);
    let removeLabelObject = {
      "labelId" : labelObject.labelId,
    }
    console.log("after changing data===>",removeLabelObject)
    console.log("data",labelObject.labelId);
    return this.http.put('removelabel/'+labelObject.noteId,removeLabelObject)
  }

  addLabelToNote(label) {
    console.log(label);
    let labelObject = {
      label : label.labels.label,
      noteId : label.noteId,
      labelId : label.labels._id
    }
    console.log("after changes",label.labels._id);
    return this.http.put('addlabel/'+label.noteId,labelObject)
  }

  createLabel(label) {
    console.log("data in create label",label)
    let createLabelObject = {
      label : label
    }
    console.log("data request object",createLabelObject)
    return this.http.headerPost('label',createLabelObject)
  }

  deleteLabel(label) {
    console.log("data in deleteLabel",label._id)
    return this.http.delete('label/'+label._id)
  }

  editLabel(label) {
    console.log("data in editLabel",label);
    return this.http.put('label/'+label._id,label);
  }

  createLabelOnNote(label) {
    console.log(label);
    return this.http.put('addlabel/'+label.noteId,label);
  }

  notesequencing(array) {
    return this.http.put('notesequencing',array);
  }
} 
 