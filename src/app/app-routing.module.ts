import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { canActivate } from "@angular/fire/auth-guard";
import { redirectUnverifiedTo, redirectVerifiedTo } from './shared/guards/auth-guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

const routes: Routes = [
  { path: '', component: LandingComponent, ...canActivate(() => redirectVerifiedTo(['home']))},
  { path: 'login', component: LoginComponent, ...canActivate(() => redirectVerifiedTo(['home']))},
  { path: 'register', component: RegisterComponent, ...canActivate(() => redirectVerifiedTo(['home']))},
  { path: 'home', component: HomeComponent, ...canActivate(() => redirectUnverifiedTo(['']))},
  { path: 'gallery', component: GalleryComponent, ...canActivate(() => redirectVerifiedTo(['home']))},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
