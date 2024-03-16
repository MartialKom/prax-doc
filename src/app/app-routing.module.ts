import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/commons/auth-guard.service';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user/profile', 
    redirectTo: 'user/profile/info'
  },
  { 
    path: 'user', 
    loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
