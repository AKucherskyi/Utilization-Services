import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TaxiComponent } from "../taxi/taxi.component";

import { TaxiPageComponent } from "./taxi/taxiPage.component";

@NgModule({
    declarations: [
        TaxiPageComponent,
        TaxiComponent
    ],
    imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [TaxiPageComponent]
  })
  export class TaxiPageModule { }