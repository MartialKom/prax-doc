import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData: any=[];
  loadingUsers: boolean = false;
  
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.loadingUsers = true;
    this.userService.getAllUser().then(
      response => {
        if(response){
          this.userData = response;
          this.loadingUsers = false;
        } else this.loadingUsers = false;
      }
    )
    
  }

}
