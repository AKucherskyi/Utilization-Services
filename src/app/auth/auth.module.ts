import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { HeaderComponent } from './../header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [
    LoginPageComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
