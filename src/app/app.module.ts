import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { TaxiComponent } from 'src/app/taxi/taxi.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TaxiPageModule } from 'src/app/pages/taxiPage.module';
import { TaxiPageComponent } from 'src/app/pages/taxi/taxiPage.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HeaderComponent,
    FilterComponent,
    MapPageComponent,
    RulesPageComponent,
    RulesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    TaxiPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
