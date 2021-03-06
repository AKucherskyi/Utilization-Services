import { AuthService } from './services/auth.service';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TaxiPageModule } from 'src/app/pages/taxiPage.module';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { RulesComponent } from './rules/rules.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommentsComponent } from './comments/comments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddServicePageComponent } from './pages/add-service-page/add-service-page.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RulesDetailsComponent } from './rules-details/rules-details.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AuthInterceptor } from './services/auth.interceptor';
import { FavouritesComponent } from './favourites/favourites.component';
import { FavouritesPageComponent } from './pages/favourites-page/favourites-page.component';
import { FavouritesPageModule } from './pages/favourites-page/favourites-page.module';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FilterComponent,
    MapPageComponent,
    RulesPageComponent,
    RulesComponent,
    CommentsComponent,
    AddServicePageComponent,
    HomeComponent,
    HomePageComponent,
    RulesDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaxiPageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPageScrollCoreModule,
    NgxPageScrollModule,
    SharedModule,
  
  ],
  providers: [AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
