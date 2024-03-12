import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.scss']
})
export class ServiceSectionComponent {

  services:boolean[] = [true, false, false, false];

  constructor(private el: ElementRef){}
  
  afficher(name:any){
    const card = this.el.nativeElement.querySelector('#'+name);
    card.style.display = 'block';
  }
}
