import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [

  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'contact',
    component: ContactFormComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
