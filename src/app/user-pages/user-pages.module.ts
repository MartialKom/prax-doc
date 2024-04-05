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
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarComponentClass } from './full-calendar/full-calendar.component';
import { DoctorsPageComponent } from './doctors-page/doctors-page.component';
import { SideBarDashboardComponent } from './side-bar-dashboard/side-bar-dashboard.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { HolidaysWiewComponent } from './holidays-wiew/holidays-wiew.component';
import { HolidaysCalendarViewComponent } from './holidays-calendar-view/holidays-calendar-view.component';
import { HolidayViewAdminComponent } from './holiday-view-admin/holiday-view-admin.component';


@NgModule({
  declarations: [
    MediaComponent,
    ProfileComponent,
    SideBarComponent,
    InformationsComponent,
    DashboardComponent,
    AppointmentViewComponent,
    AppointmentFormComponent,
    FullCalendarComponentClass,
    DoctorsPageComponent,
    SideBarDashboardComponent,
    HomeDashboardComponent,
    HolidaysWiewComponent,
    HolidaysCalendarViewComponent,
    HolidayViewAdminComponent,
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    FullCalendarModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
  ]
})
export class UserPagesModule { }
