import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
BaseURL='https://route-egypt-api.herokuapp.com/'
currentUser:any= new BehaviorSubject(null)

register(data:any):Observable<any>{
  return this._HttpClient.post(this.BaseURL+'signup',data)
}
signin(data:any):Observable<any>{
  return this._HttpClient.post(this.BaseURL+'signin',data)
}
saveCurrentUser(){
  let encode=JSON.stringify(localStorage.getItem('token'))
  let decoded=jwtDecode(encode);
  this.currentUser.next(decoded)
 

}
  constructor(private _HttpClient:HttpClient) { 
    if(localStorage.getItem("token")){
      this.saveCurrentUser()
    }
  }

}
