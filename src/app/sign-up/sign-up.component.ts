import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isRegister:boolean;
  apiData:any
  constructor(private _auth:AuthService,private _router:Router) { 
    this.isRegister=false;
  }

 registerForm:FormGroup=new FormGroup({
    first_name : new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
    last_name : new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
    age : new FormControl('',[ Validators.required,Validators.min(15),Validators.max(100)]),
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required ,Validators.minLength(3),Validators.maxLength(12),Validators.pattern(/^[0-9]/)]),
});
  signUp(data:any){
    console.log(data.value);
    this._auth.register((data.value)).subscribe({
      next:(res:any)=>{
        console.log(res.message)
        if(res.message == 'success')
        {
          this.isRegister=true;
          this._router.navigate(['/signIn'])
        }
        else
        {
          this.isRegister=false
          this.apiData=res.message;
        }
      }
      
    })

  }

  ngOnInit(): void {
    $('#signUp').particleground();
  }
 
}
