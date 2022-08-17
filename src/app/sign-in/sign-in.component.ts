import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare var $:any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required ,Validators.minLength(3),Validators.maxLength(12),Validators.pattern(/^[0-9]/)]),
});
  constructor(private _auth:AuthService,private _router:Router) { 
    if(localStorage.getItem('token')){
      this._router.navigate(['/profile'])
    }
    
  }
login()
{
  this._auth.signin(this.loginForm.value).subscribe((res)=>{
    // console.log(res);
    if(res.message=="success"){
      localStorage.setItem('token',res.token)
      this._auth.saveCurrentUser()
      this._router.navigate(['/profile'])
    }
    
  })
}
 

  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
