import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  aboutText: any;
  isLoadingAbout: boolean = false;

  imgAbout: any;

  documents: any = [];


  selectedImage: any = "";
  selectedImageUrl: any = "";

  initialAbout = {
    aboutIndice: "",
    aboutTitle: "",
    aboutText: "",
    aboutText2: ""
  }

  updateAbout = {
    aboutIndice: "",
    aboutTitle: "",
    aboutText: "",
    aboutText2: ""
  }

  header:any[] = [];

  isFrontEnd: boolean = false;
  
  openModal(content: any): void {
    if(this.isFrontEnd){
      const dialogRef = this.modalService.open(content);
    }
  }

  hideModal() {

    this.updateAbout.aboutIndice = this.initialAbout.aboutIndice;
    this.updateAbout.aboutTitle = this.initialAbout.aboutTitle;
    this.updateAbout.aboutText = this.initialAbout.aboutText;
    this.updateAbout.aboutText2 = this.initialAbout.aboutText2;

    this.modalService.closeAll();
  }

  constructor(private modalService: MatDialog, private router: Router, private frontEndService: FrontEndService,
    private storageService: LocalStorageService){
      this.router.events.subscribe(event => {
        if (event) {
          this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
        }
      });
    }

    
  ngOnInit(): void {


    this.documents = this.storageService.get('documents');

    this.isLoadingAbout = true;
    this.aboutText = this.storageService.get("text");
    const aboutText = this.aboutText;

    if(aboutText){
      this.initialAbout.aboutIndice = aboutText["about-indice"];
      this.initialAbout.aboutText = aboutText["about-text"];
      this.initialAbout.aboutText2 = aboutText["about-text2"];
      this.initialAbout.aboutTitle = aboutText["about-header"];

      this.header = this.initialAbout.aboutTitle.split(' ');

      this.updateAbout.aboutIndice = aboutText["about-indice"];
      this.updateAbout.aboutText = aboutText["about-text"];
      this.updateAbout.aboutTitle = aboutText["about-header"];
      this.updateAbout.aboutText2 = aboutText["about-text2"];

      this.imgAbout = aboutText["about-img"];

      this.isLoadingAbout =false;
    } else {
      this.frontEndService.getHeroText().then(
        (response) =>{
          if(response[0].$id){
            this.storageService.set("text", response[0]);
            const aboutText = response[0];
            this.aboutText = response[0];

            this.initialAbout.aboutIndice = aboutText["about-indice"];
            this.initialAbout.aboutText = aboutText["about-text"];
            this.initialAbout.aboutTitle = aboutText["about-header"];
            this.initialAbout.aboutText2 = aboutText["about-text2"];

            this.header = this.initialAbout.aboutTitle.split(' ');
      
            this.updateAbout.aboutIndice = aboutText["about-indice"];
            this.updateAbout.aboutText = aboutText["about-text"];
            this.updateAbout.aboutTitle = aboutText["about-header"];
            this.updateAbout.aboutText2 = aboutText["about-text2"];

            this.imgAbout = aboutText["about-img"];
  
          }
          this.isLoadingAbout = false;
        }
      );
    }
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  isSecondWord(index: number) {
    return index === 1;
  }
  
  isLastWord(index: number) {
    return index === this.header.length - 1;
  }

  updateText(){
    this.isLoadingAbout = true;
    this.frontEndService.updateAboutText(this.updateAbout,this.aboutText.$id).then(
      (response) =>{
        this.storageService.remove("text");
        if(response.$id){
          location.reload()
        } else this.isLoadingAbout = false;
      }
    )
  }

  updateImg(){
    this.isLoadingAbout = true;
    this.frontEndService.updateAboutImg(this.selectedImageUrl,this.aboutText.$id).then(
      (response) =>{
        this.storageService.remove("text");
        if(response.$id){
          location.reload()
        } else this.isLoadingAbout = false;
      }
    )
  }


  imgSelect(id: any, url: any){
    this.selectedImage = id;
    this.selectedImageUrl = url;
    console.log(this.selectedImage);
  }
}
