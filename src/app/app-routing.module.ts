import { NgModule, ɵcompileNgModuleDefs } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full', canActivate: [authGuard], data: { needsLogin: false}},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [authGuard], data: { needsLogin: false}},
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule), canActivate: [authGuard], data: { needsLogin: false} },
  { path: 'gallery', loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule), canActivate: [authGuard], data: { needsLogin: false}},
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule), canActivate: [authGuard], data: { needsLogin: false}},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [authGuard], data: { needsLogin: true } },
  { path: '**', redirectTo: '/not-found', canActivate: [authGuard], data: { needsLogin: false}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
