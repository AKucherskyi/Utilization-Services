import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: '**', component: NotFoundComponent }
];
  @NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  