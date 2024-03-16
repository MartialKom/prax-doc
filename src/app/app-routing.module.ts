import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/commons/auth-guard.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: '',
    component: AppComponent,
    children:[
      {
        path: 'user/profile', 
        redirectTo: 'user/profile/info'
      },
      { 
        path: 'user', 
        loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule),
        canActivate: [AuthGuardService],
      },
      { 
        path: 'home', 
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
    ] 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
