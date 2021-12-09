import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxiPageComponent } from './pages/taxi/taxiPage.component';



const routes: Routes = [
      { path: 'taxi', component: TaxiPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
