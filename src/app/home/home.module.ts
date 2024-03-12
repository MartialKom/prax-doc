import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
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


@NgModule({
  declarations: [
    IndexComponent,
    HeaderComponent,
    HeroComponent,
    InfoCardComponent,
    AboutUsComponent,
    ServiceSectionComponent,
    InterestingLinksComponent,
    TeamComponent,
    TestimonialsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
