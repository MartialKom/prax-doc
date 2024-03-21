import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaComponent } from './media/media.component';
import { ProfileComponent } from './profile/profile.component';
import { InformationsComponent } from './informations/informations.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'media',
    component: MediaComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {path:'info', component: InformationsComponent, pathMatch: "full"}
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPagesRoutingModule { }
