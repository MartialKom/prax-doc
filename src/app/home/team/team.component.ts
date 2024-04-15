import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { FrontEndService } from 'src/app/services/frontEnd-service/front-end.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {


  loadingTeam: boolean = false;
  teamText: any;

  documents: any = [];


  selectedImage: any = "";
  selectedImageUrl: any = null;

  allTeam : any[] = [];
  allUpdateTeam: any[] = [];
  selectedTeam: any;

  initialTeam = {
    teamTitle : "",
    teamText : ""
  }

  updateTeam= {
    teamTitle : "",
    teamText : ""
  }

  isFrontEnd: boolean = false;


  ngOnInit(): void {
    this.loadingTeam = true;

    this.documents = this.storageService.get('documents');
    this.teamText = this.storageService.get("text");

    const text = this.teamText;

    this.frontEndService.getTeam().then(
      (response) => {
        if (response){
          this.allTeam = response;
          this.allUpdateTeam = response;
        }
      }
    )

    if(text){
      this.initialTeam.teamText = text["team-text"];
      this.initialTeam.teamTitle = text["team-title"];

      this.updateTeam.teamText = text["team-text"];
      this.updateTeam.teamTitle = text["team-title"];

      this.loadingTeam =false;
    } else {
      this.frontEndService.getHeroText().then(
        (response) =>{
          if(response[0].$id){
            this.storageService.set("text", response[0]);
            const text = response[0];
            this.teamText = response[0];

            this.initialTeam.teamText  = text["team-text"];
            this.initialTeam.teamTitle  = text["team-title"];
      
            this.updateTeam.teamText = text["team-text"];
            this.updateTeam.teamTitle= text["team-title"];
  
          }
          this.loadingTeam = false;
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

    this.updateTeam.teamText = this.initialTeam.teamText
    this.updateTeam.teamTitle = this.initialTeam.teamTitle

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


    imgSelect(id: any, url: any){
      if(id === this.selectedImage ) {
        this.selectedImage = "";
        this.selectedImageUrl = "";
      }else{
        this.selectedImage = id;
        this.selectedImageUrl = url;
      }
      console.log(this.selectedImage);
    }

    updateText(){
      this.loadingTeam = true;
      this.frontEndService.updateTeamText(this.updateTeam,this.teamText.$id).then(
        (response) =>{
          this.storageService.remove("text");
          if(response.$id){
            location.reload()
          } else this.loadingTeam = false;
        }
      )
    }

    openUpdateTeamModal(index: any, content: any){

      if(this.isFrontEnd){
        this.selectedTeam = this.allUpdateTeam[index];
        const dialogRef = this.modalService.open(content);
      }

    }

    updateTeamValue(){
      this.loadingTeam = true;
      const idDoc = this.selectedTeam.$id;

      this.frontEndService.updateTeam(this.selectedTeam, idDoc, this.selectedImageUrl).then(
        (response)=> {
          if (response){
            location.reload()
          }else this.loadingTeam =false
        }
      )

    }

}
