import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }
  BaseURL='https://routeegypt.herokuapp.com/'
  addNote(data:any):Observable<any>{
    return this._HttpClient.post(this.BaseURL+'addNote',data)
  }
  getAll(data:any):Observable<any>{
    return this._HttpClient.post(this.BaseURL+'getUserNotes',data)
  }

  delete(data:any):Observable<any>{
    let option={
      body:{
        "NoteID":data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(this.BaseURL+'deleteNote',option)
  }
  update(data:any):Observable<any>{
    return this._HttpClient.put(this.BaseURL+'updateNote',data)
  }
}
