import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';


// Routes
export const ROUTES: Routes = [
  { path: '', component: LoginComponent }
];


// Module
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
