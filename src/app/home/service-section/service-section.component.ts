import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.scss']
})
export class ServiceSectionComponent implements OnInit {

  services:boolean[] = [true, false, false, false];

  loadingService : boolean = false;
  serviceText: any;

  initialService = {
    serviceTitle : "",
    serviceText : ""
  }

  updateService = {
    serviceTitle : "",
    serviceText : ""
  }

  isFrontEnd: boolean = false;

  constructor(private el: ElementRef,private modalService: MatDialog, private router: Router, private frontEndService: FrontEndService,
    private storageService: LocalStorageService){
      this.router.events.subscribe(event => {
        if (event) {
          this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
        }
      });
    }

  ngOnInit(): void {
    this.loadingService = true;

    this.serviceText = this.storageService.get("text");

    const text = this.serviceText;

    if(text){
      this.initialService.serviceText = text["service-text"];
      this.initialService.serviceTitle = text["service-title"];

      this.updateService.serviceText = text["service-text"];
      this.updateService.serviceTitle = text["service-title"];

      this.loadingService =false;
    } else {
      this.frontEndService.getHeroText().then(
        (response) =>{
          if(response[0].$id){
            this.storageService.set("text", response[0]);
            const text = response[0];
            this.serviceText = response[0];

            this.initialService.serviceText = text["service-text"];
            this.initialService.serviceTitle = text["service-title"];
      
            this.updateService.serviceText = text["service-text"];
            this.updateService.serviceTitle = text["service-title"];
  
          }
          this.loadingService = false;
        }
      );
    }
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  openModal(content: any): void {
    if(this.isFrontEnd){
      const dialogRef = this.modalService.open(content);
    }
  }

  hideModal() {

    this.updateService.serviceText = this.initialService.serviceText
    this.updateService.serviceTitle = this.initialService.serviceTitle

    this.modalService.closeAll();
  }

  afficher(name:any){
    const card = this.el.nativeElement.querySelector('#'+name);
    card.style.display = 'block';
  }

  updateText(){
    this.loadingService = true;
    this.frontEndService.updateServiceText(this.updateService,this.serviceText.$id).then(
      (response) =>{
        this.storageService.remove("text");
        if(response.$id){
          location.reload()
        } else this.loadingService = false;
      }
    )
  }
}
