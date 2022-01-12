import { CommonModule } from '@angular/common';
import { HeaderComponent } from './../header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent, ReactiveFormsModule, RouterModule,   FormsModule, MatDialogModule],
  imports: [RouterModule, ReactiveFormsModule,   FormsModule, CommonModule],
})
export class SharedModule {}
