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

    this.teamText = this.storageService.get("text");

    const text = this.teamText;

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


}
