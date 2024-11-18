import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'elegir-rol',
    loadChildren: () => import('./elegir-rol/elegir-rol.module').then( m => m.ElegirRolPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'eleccion-master',
    loadChildren: () => import('./eleccion-master/eleccion-master.module').then( m => m.EleccionMasterPageModule)
  },
  {
    path: 'crear-servidor',
    loadChildren: () => import('./crear-servidor/crear-servidor.module').then( m => m.CrearServidorPageModule)
  },
  {
    path: 'personajes-master',
    loadChildren: () => import('./personajes-master/personajes-master.module').then( m => m.PersonajesMasterPageModule)
  },
  {
    path: 'items-master',
    loadChildren: () => import('./items-master/items-master.module').then( m => m.ItemsMasterPageModule)
  },
  {
    path: 'npcs-master',
    loadChildren: () => import('./npcs-master/npcs-master.module').then( m => m.NpcsMasterPageModule)
  },
  {
    path: 'servidores-master',
    loadChildren: () => import('./servidores-master/servidores-master.module').then( m => m.ServidoresMasterPageModule)
  },
  {
    path: 'servidores-player',
    loadChildren: () => import('./servidores-player/servidores-player.module').then( m => m.ServidoresPlayerPageModule)
  },
  {
    path: 'personajes-player',
    loadChildren: () => import('./personajes-player/personajes-player.module').then( m => m.PersonajesPlayerPageModule)
  },  {
    path: 'mateoo',
    loadChildren: () => import('./mateoo/mateoo.module').then( m => m.MateooPageModule)
  },
  {
    path: 'cubo',
    loadChildren: () => import('./cubo/cubo.module').then( m => m.CuboPageModule)
  },
  {
    path: 'sebastian',
    loadChildren: () => import('./sebastian/sebastian.module').then( m => m.SebastianPageModule)
  },
  {
    path: 'elgordo',
    loadChildren: () => import('./elgordo/elgordo.module').then( m => m.ElgordoPageModule)
  },
  {
    path: 'camilo',
    loadChildren: () => import('./camilo/camilo.module').then( m => m.CamiloPageModule)
  },
  {
    path: 'caracteristicas',
    loadChildren: () => import('./caracteristicas/caracteristicas.module').then( m => m.CaracteristicasPageModule)
  },
  {
    path: 'crear-personaje',
    loadChildren: () => import('./crear-personaje/crear-personaje.module').then( m => m.CrearPersonajePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
