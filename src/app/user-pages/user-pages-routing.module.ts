import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaComponent } from './media/media.component';
import { ProfileComponent } from './profile/profile.component';
import { InformationsComponent } from './informations/informations.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuardService } from '../services/commons/admin-guard.service';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { FullCalendarComponentClass } from './full-calendar/full-calendar.component';

const routes: Routes = [
  {
    path: 'media',
    component: MediaComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {path:'info', component: InformationsComponent, pathMatch: "full"},
      {path: 'appointment', component: AppointmentFormComponent, pathMatch: "full"}
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuardService]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPagesRoutingModule { }
