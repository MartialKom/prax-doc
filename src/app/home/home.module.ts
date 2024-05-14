import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HeroComponent } from './hero/hero.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ServiceSectionComponent } from './service-section/service-section.component';
import { InterestingLinksComponent } from './interesting-links/interesting-links.component';
import { TeamComponent } from './team/team.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { FooterComponent } from './footer/footer.component';
import { MakeRequestService } from '../services/commons/make-request.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from "@angular/material/input";
import { ContactFormComponent } from './contact-form/contact-form.component';



@NgModule({
  declarations: [
    IndexComponent,
    HeroComponent,
    InfoCardComponent,
    AboutUsComponent,
    ServiceSectionComponent,
    InterestingLinksComponent,
    TeamComponent,
    TestimonialsComponent,
    FooterComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
		MatInputModule,
    NgbModule
  ],
  providers: [
    MakeRequestService
  ]
})
export class HomeModule { }
