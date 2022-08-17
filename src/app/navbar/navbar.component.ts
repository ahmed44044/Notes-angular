import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
signed:boolean=false
  constructor(private _auth:AuthService, private _router:Router) { 
    this._auth.currentUser.subscribe(()=>{
      if(this._auth.currentUser.getValue()!=null){
        this.signed=true
      }
      else{
        this.signed=false
      }
    })
  }
logout(){
  localStorage.removeItem('token')
  this._router.navigate(['/signIn'])
}
  ngOnInit(): void {
  }

}
