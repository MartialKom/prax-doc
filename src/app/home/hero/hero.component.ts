import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {


  heroText: any;
  isLoadingHero: boolean = false;
  initialHero = {
    heroIndice: "",
    heroHeading1: "",
    heroHeading2: "",
    heroHeading3: "",
    heroHeadingText: "",
  }
  updateHero = {
    heroIndice: "",
    heroHeading1: "",
    heroHeading2: "",
    heroHeading3: "",
    heroHeadingText: "",
  }

  isFrontEnd: boolean = false;
  
  openModal(content: any): void {
    if(this.isFrontEnd){
      const dialogRef = this.modalService.open(content);
    }
   
  }

hideModal() {
  this.updateHero.heroIndice = this.heroText['hero-indice'];
  this.updateHero.heroHeading1 = this.heroText['hero-heading1'];
  this.updateHero.heroHeading2 = this.heroText['hero-heading2'];
  this.updateHero.heroHeading3 = this.heroText['hero-heading3'];
  this.updateHero.heroHeadingText = this.heroText['hero-headingText'];
  this.modalService.closeAll();
}



  constructor(private router: Router, private frontEndService: FrontEndService, private modalService: MatDialog,
    private storageService: LocalStorageService){
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  ngOnInit(): void {

    this.isLoadingHero = true;
    this.frontEndService.getHeroText().then(
      (response) =>{
        if(response[0].$id){
          this.storageService.set("text", response[0]);
          this.heroText = response[0];
          this.initialHero.heroIndice = this.heroText['hero-indice'];
          this.initialHero.heroHeading1 = this.heroText['hero-heading1'];
          this.initialHero.heroHeading2 = this.heroText['hero-heading2'];
          this.initialHero.heroHeading3 = this.heroText['hero-heading3'];
          this.initialHero.heroHeadingText = this.heroText['hero-headingText'];

          this.updateHero.heroIndice = this.heroText['hero-indice'];
          this.updateHero.heroHeading1 = this.heroText['hero-heading1'];
          this.updateHero.heroHeading2 = this.heroText['hero-heading2'];
          this.updateHero.heroHeading3 = this.heroText['hero-heading3'];
          this.updateHero.heroHeadingText = this.heroText['hero-headingText'];

        }
        this.isLoadingHero = false;
      }
    );
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  updateText(){
    this.isLoadingHero = true;
    this.frontEndService.updateHeroText(this.updateHero,this.heroText.$id).then(
      (response) =>{
        if(response.$id){
          location.reload()
        } else this.isLoadingHero = false;
      }
    )
  }


}
