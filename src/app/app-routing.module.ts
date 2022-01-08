import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { AddServicePageComponent } from './pages/add-service-page/add-service-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { TaxiPageComponent } from './pages/taxi/taxiPage.component';
import { AuthGuard } from './services/auth.guard';



const routes: Routes = [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'map', component: MapPageComponent },
      { path: 'add', component: AddServicePageComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomePageComponent },
      { path: 'rules', component: RulesPageComponent },
      {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
      { path: 'user', loadChildren: () => import('./pages/user-page/user-page.module').then(m => m.UserPageModule), canActivate: [AuthGuard] },
      { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
