import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {path : '' , redirectTo: '/login', pathMatch: 'full'},
  {path : 'login' , loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)},
  {path : 'register' , loadChildren: () => import('./components/register/register.module').then((m) => m.RegisterModule)},
  {path : 'home' , canActivate : [AuthGuard],
    loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule)},
  {path : 'user/:id' , canActivate : [AuthGuard],
    loadChildren: () => import('./components/profile-user/profile-user.module').then((m) => m.ProfileUserModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
