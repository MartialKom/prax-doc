import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isFrontEnd: boolean = false;
  footer : any ;

  selectedItem: any;
  selectedValue: any;

  loadingFooter: boolean = false;

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
    
    this.loadingFooter = true;

    this.frontEndService.getFooter().then(
      (response)=>{
        if(response){
          this.footer = response[0];
          this.loadingFooter = false;
        } else this.loadingFooter = false;
      }
    );

    this.router.events.subscribe((event) => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }

  openModal(att:any, content: any){
    if (this.isFrontEnd) {
      this.selectedItem = att;
      this.selectedValue = this.footer[att];
      const dialogRef = this.modalService.open(content);
    }
  }

  changeText(){

    this.loadingFooter = true;

    this.frontEndService.changeFooterText(this.footer.$id, this.selectedItem, this.selectedValue).then(
      (response)=>{
        if(response){
          location.reload();
        }else this.loadingFooter = false;
      }
    )
  }

  hideModal() {
    this.modalService.closeAll();
  }
  
}
