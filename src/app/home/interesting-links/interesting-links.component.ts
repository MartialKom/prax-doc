import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-interesting-links',
  templateUrl: './interesting-links.component.html',
  styleUrls: ['./interesting-links.component.scss'],
})
export class InterestingLinksComponent implements OnInit {
  loadingLink: boolean = false;

  isFrontEnd: boolean = false;
  selectedLink: any;
  selectedTitleLink: any;

  allLink: any[] = [];
  allTitle: any[] = [];

  allFirstLink: any[] = [];
  allSecondLink: any[] = [];
  allThirdLink: any[] = [];
  allFouthLink: any[] = [];

  constructor(
    private modalService: MatDialog,
    private router: Router,
    private frontEndService: FrontEndService,
    private storageService: LocalStorageService
  ) {
    this.router.events.subscribe((event) => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  ngOnInit(): void {
    this.loadingLink = false;

    this.frontEndService.getLinks().then((response) => {
      if (response) {
        this.allLink = response;

        for (let link of this.allLink) {
          if (link.position === 1) this.allFirstLink.push(link);
          if (link.position === 2) this.allSecondLink.push(link);
          if (link.position === 3) this.allThirdLink.push(link);
          if (link.position === 4) this.allFouthLink.push(link);
        }
      }
    });

    this.frontEndService.getTitleLinks().then((response) => {
      if (response) {
        this.allTitle = response;
      }
    });

    this.router.events.subscribe((event) => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }


  openLinkModal(link: any, content: any){

    this.selectedLink = link;
    const dialogRef = this.modalService.open(content);
  }

  openTitleModal(index: number, content: any){
    this.selectedTitleLink = this.allTitle[index];
    const dialogRef = this.modalService.open(content);
  }

  hideModal() {
    this.modalService.closeAll();
  }

  changeLink(){

    this.loadingLink = true;

    this.frontEndService.updateLink(this.selectedLink.$id, this.selectedLink).then(
      (response)=>{
        if(response){
          location.reload();
        } else this.loadingLink = false;
      }
    );
  }

  changeTitltLink(){

    this.loadingLink = true;

    this.frontEndService.updateTitleLink(this.selectedTitleLink.$id, this.selectedTitleLink).then(
      (response)=>{
        if(response){
          location.reload();
        } else this.loadingLink = false;
      }
    )
  }

}
