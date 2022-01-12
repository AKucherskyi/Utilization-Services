import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';
import { TitleComponent } from './title/title.component';
import { MainComponent } from './main/main.component';
import { AsideComponent } from './aside/aside.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog/password-dialog.component';


@NgModule({
  declarations: [
    UserPageComponent,
    TitleComponent,
    MainComponent,
    AsideComponent,
    PasswordDialogComponent
  ],
  imports: [
    SharedModule,
    UserPageRoutingModule
  ]
})
export class UserPageModule { }
