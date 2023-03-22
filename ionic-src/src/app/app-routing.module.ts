import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'lodge-info/:lodgeId',
    loadChildren: () => import('./pages/lodge-info/lodge-info.module').then(m => m.LodgeInfoPageModule)
  },
  {
    path: 'new-lodge',
    loadChildren: () => import('./pages/new-lodge/new-lodge.module').then(m => m.NewLodgePageModule)
  },
  {
    path: 'new-club',
    loadChildren: () => import('./pages/new-club/new-club.module').then(m => m.NewClubPageModule)
  },
  {
    path: 'edit-lodge/:lodgeId',
    loadChildren: () => import('./pages/edit-lodge/edit-lodge.module').then(m => m.EditLodgePageModule)
  },  {
    path: 'my-club',
    loadChildren: () => import('./pages/my-club/my-club.module').then( m => m.MyClubPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
