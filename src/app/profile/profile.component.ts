import { NoteService } from './../note.service';
import { AuthService } from './../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  dataServise:any

  token=localStorage.getItem("token")

  constructor(private _router:Router,private _auth:AuthService,private _note:NoteService) { 

   this.dataServise= this._auth.currentUser.getValue()
  
   
  
    if(!localStorage.getItem('token')){
      this._router.navigate(['/signIn'])
    }
    
  }

  ngOnInit(): void {
    
    this.getNotes()
    
  }
  addNote:FormGroup=new FormGroup({
    title: new FormControl(),
    desc:new FormControl()
  })
  addFun(data:any){
    console.log(data);
    let addObj={
      title:data.value.title,
      desc:data.value.desc,
      citizenID:this.dataServise._id,
      token:this.token


    }
    
    this._note.addNote(addObj).subscribe({
      next:(data)=>
      {
        if(data.message== 'success')
        {
          this.addNote.reset();
          this.getNotes()
        }
        // console.log(data.message);
        this.getNotes()
        
      }
    })
    
  }
  NoteArray:any[]=[]
getNotes(){
  let getObj={
    token:this.token,
    "userID":this.dataServise._id,
  }
  this._note.getAll(getObj).subscribe({
    next:(data:any)=>{
      // console.log(data);
      this.NoteArray=data.Notes
      // console.log(this.NoteArray);
      
      
    }
  })
}
globalId:any
getId(id:any){
  this.globalId=id
  
}
delt(){
  let delObj={
    token:this.token,
    NoteID:this.globalId

  }
  this._note.delete(delObj).subscribe({
    next:(data)=>{
    // console.log(data.message);
    if(data.message == "deleted"){
      this.getNotes()
    }
    }
    
  })
}

updateNote:FormGroup=new FormGroup({
  title: new FormControl(),
  desc:new FormControl()
})
EditFun(data:any){
  let updateObjct={
    title:data.value.title,
      desc:data.value.desc,
      NoteID:this.globalId,
      token:this.token

  }

  this._note.update(updateObjct).subscribe({
    next:(data)=>{
      // console.log(data);
      if(data.message== 'updated')
      {
        this.updateNote.reset();
        this.getNotes()
      }
    }
  })
}
setValu(data:any)
{
  // console.log(data);
  this.updateNote.controls['title'].setValue(data.title)
  this.updateNote.controls['desc'].setValue(data.desc )
  
}
}
