import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { ServicePageRoutingModule } from './service-page-routing.module';
import { ServicePageComponent } from './service-page.component';


@NgModule({
  declarations: [
    ServicePageComponent
  ],
  imports: [
    SharedModule,
    ServicePageRoutingModule
  ]
})
export class ServicePageModule { }
