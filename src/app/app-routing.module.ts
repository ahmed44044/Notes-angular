import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'',redirectTo:'signIn',pathMatch:'full'},
  {path:'signIn',component:SignInComponent},
  {path:'signUp',component:SignUpComponent},
  {path:'profile',component:ProfileComponent},
  {path:'**',component:NotFoundComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
