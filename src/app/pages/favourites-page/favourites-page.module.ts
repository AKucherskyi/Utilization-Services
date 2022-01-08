import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesPageComponent } from './favourites-page.component';
import { FavouritesComponent } from 'src/app/favourites/favourites.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavouritesPageRoutingModule } from './favourites-page-routing.module';




@NgModule({
  declarations: [FavouritesComponent, FavouritesPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FavouritesPageRoutingModule
    
  ],
  
})
export class FavouritesPageModule { }
