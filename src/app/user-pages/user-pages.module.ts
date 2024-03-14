import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { MediaComponent } from './media/media.component';


@NgModule({
  declarations: [
    MediaComponent
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule
  ]
})
export class UserPagesModule { }
