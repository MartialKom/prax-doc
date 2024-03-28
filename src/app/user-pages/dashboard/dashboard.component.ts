import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData: any[] = [];
  docsData: any[]= [];
  loadingUsers: boolean = false;
  userVerified: number = 0;
  totalUsers: number = 0;
  totalDocs: number = 0;
  totalPdf: number = 0;
  totalImg: number = 0;
  isActiveUser = true;

  veriedUserPercentage:number = 0;
  imagePercentage: number = 0;
  pdfPercentage: number = 0;


  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.loadingUsers = true;
    try{
      this.userService.getAllUser().then(
        response => {
          if(response){
            this.userData = response;
  
            for(let user of this.userData){
              if(user.isVerified === true) this.userVerified +=1;
            }
  
            this.totalUsers = this.userData.length;

            const percentage = (this.userVerified/this.totalUsers)*100 ;

            if(percentage)
            this.veriedUserPercentage = percentage;
  
          }
        }
      )
      this.userService.getAllDoc().then(
        response => {
          if(response){
            this.docsData = response;
            
            for(let doc of this.docsData){
              if(doc.type === 'pdf') this.totalPdf +=1;
              else this.totalImg +=1;
            }
  
            this.totalDocs = this.docsData.length;

            const percent = (this.totalImg/this.totalDocs)*100 ;

            if(percent) this.imagePercentage = percent;

            const percentPdf = (this.totalPdf/this.totalDocs)*100;

            if(percentPdf) this.pdfPercentage = percentPdf;
          }
          this.loadingUsers = false;
        }
        
      )
  
      
    }catch(error){
      this.loadingUsers = false;
      return;
    }


  }

}
