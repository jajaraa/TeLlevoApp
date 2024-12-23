import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './servicios/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./Access/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Access/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./Access/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'crearviaje',
    loadChildren: () => import('./crearviaje/crearviaje.module').then( m => m.CrearviajePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'viajes',
    loadChildren: () => import('./viajes/viajes.module').then( m => m.ViajesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'esperando',
    loadChildren: () => import('./esperando/esperando.module').then( m => m.EsperandoPageModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
