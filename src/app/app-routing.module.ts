import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServicePageComponent } from './pages/add-service-page/add-service-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { TaxiPageComponent } from './pages/taxi/taxiPage.component';



const routes: Routes = [
      { path: '', redirectTo: '/map', pathMatch: 'full' },
      { path: 'map', component: MapPageComponent },
      { path: 'add', component: AddServicePageComponent },
      { path: 'taxi', component: TaxiPageComponent },
      { path: 'rules', component: RulesPageComponent },
      { path: '**', redirectTo: '/map' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
