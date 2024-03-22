import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { MediaComponent } from './media/media.component';
import { ProfileComponent } from './profile/profile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { InformationsComponent } from './informations/informations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';


@NgModule({
  declarations: [
    MediaComponent,
    ProfileComponent,
    SideBarComponent,
    InformationsComponent,
    DashboardComponent,
    AppointmentViewComponent
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class UserPagesModule { }
