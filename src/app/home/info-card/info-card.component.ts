import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  allText: any
  inititalInfoCard: any[] = [
    {
      title:"",
      text:"",
    },
    {
      title:"",
      text:"",
    },
    {
      title:"",
      text:"",
    },
    {
      title:"",
      text:"",
    }
  ]

  updateInfoCard: any[] = [
    {
      title:"",
      text:"",
    },
    {
      title:"",
      text:"",
    },
    {
      title:"",
      text:"",
    },
    {
      title:"",
      text:"",
    }
  ]

  isFrontEnd: boolean = false;
  isLoadingCard: boolean = false;


  constructor(private router: Router, private frontEndService: FrontEndService, private modalService: MatDialog,
    private storageService: LocalStorageService){
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  ngOnInit(): void {

    this.isLoadingCard = true;
    this.allText = this.storageService.get("text");
    const allText = this.allText;
    if(allText){
      this.inititalInfoCard[0].title = allText["infoCard1-Title"];
      this.inititalInfoCard[0].text = allText["infoCard1-Text"];

      this.inititalInfoCard[1].title = allText["infoCard2-Title"];
      this.inititalInfoCard[1].text = allText["infoCard2-Text"];

      this.inititalInfoCard[2].title = allText["infoCard3-Title"];
      this.inititalInfoCard[2].text = allText["infoCard3-Text"];

      this.inititalInfoCard[3].title = allText["infoCard4-Title"];
      this.inititalInfoCard[3].text = allText["infoCard4-Text"];


      this.updateInfoCard[0].title = allText["infoCard1-Title"];
      this.updateInfoCard[0].text = allText["infoCard1-Text"];

      this.updateInfoCard[1].title = allText["infoCard2-Title"];
      this.updateInfoCard[1].text = allText["infoCard2-Text"];

      this.updateInfoCard[2].title = allText["infoCard3-Title"];
      this.updateInfoCard[2].text = allText["infoCard3-Text"];

      this.updateInfoCard[3].title = allText["infoCard4-Title"];
      this.updateInfoCard[3].text = allText["infoCard4-Text"];

      this.isLoadingCard = false;
    } else {
      this.frontEndService.getHeroText().then(
        (response) =>{
          if(response[0].$id){
            this.storageService.set("text", response[0]);
            const allText = response[0];
            this.allText = response[0];
            this.inititalInfoCard[0].title = allText["infoCard1-Title"];
            this.inititalInfoCard[0].text = allText["infoCard1-Text"];
      
            this.inititalInfoCard[1].title = allText["infoCard2-Title"];
            this.inititalInfoCard[1].text = allText["infoCard2-Text"];
      
            this.inititalInfoCard[2].title = allText["infoCard3-Title"];
            this.inititalInfoCard[2].text = allText["infoCard3-Text"];
      
            this.inititalInfoCard[3].title = allText["infoCard4-Title"];
            this.inititalInfoCard[3].text = allText["infoCard4-Text"];
      
      
            this.updateInfoCard[0].title = allText["infoCard1-Title"];
            this.updateInfoCard[0].text = allText["infoCard1-Text"];
      
            this.updateInfoCard[1].title = allText["infoCard2-Title"];
            this.updateInfoCard[1].text = allText["infoCard2-Text"];
      
            this.updateInfoCard[2].title = allText["infoCard3-Title"];
            this.updateInfoCard[2].text = allText["infoCard3-Text"];
      
            this.updateInfoCard[3].title = allText["infoCard4-Title"];
            this.updateInfoCard[3].text = allText["infoCard4-Text"];
  
          }
          this.isLoadingCard = false;
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
    this.updateInfoCard[0].title = this.inititalInfoCard[0].title ;
    this.updateInfoCard[0].text = this.inititalInfoCard[0].text;

    this.updateInfoCard[1].title = this.inititalInfoCard[1].title;
    this.updateInfoCard[1].text = this.inititalInfoCard[1].text;

    this.updateInfoCard[2].title = this.inititalInfoCard[2].title;
    this.updateInfoCard[2].text = this.inititalInfoCard[2].text;

    this.updateInfoCard[3].title =this.inititalInfoCard[3].title ;
    this.updateInfoCard[3].text = this.inititalInfoCard[3].text;

    this.modalService.closeAll();
  }

  updateText(){
    this.isLoadingCard = true;
    this.frontEndService.updateCardText(this.updateInfoCard,this.allText.$id).then(
      (response) =>{
        this.storageService.remove("text");
        if(response.$id){
          location.reload()
        } else this.isLoadingCard = false;
      }
    )
  }

}
