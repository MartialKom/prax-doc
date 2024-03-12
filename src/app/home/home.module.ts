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


@NgModule({
  declarations: [
    IndexComponent,
    HeaderComponent,
    HeroComponent,
    InfoCardComponent,
    AboutUsComponent
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
