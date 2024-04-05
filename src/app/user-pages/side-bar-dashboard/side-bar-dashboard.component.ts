import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';

@Component({
  selector: 'app-side-bar-dashboard',
  templateUrl: './side-bar-dashboard.component.html',
  styleUrls: ['./side-bar-dashboard.component.scss']
})
export class SideBarDashboardComponent implements OnInit {

  isDoctor: boolean = false;
  isFrontEnd: boolean = false;
  navHidden: boolean = false;

  constructor(private localstorageService: LocalStorageService, private router: Router){
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
        this.navHidden = this.router.url === '/user/dashboard/frontEnd';
      }
    });
  }
  

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event) {
        this.isFrontEnd = this.router.url === '/user/dashboard/frontEnd';
        this.navHidden = this.router.url === '/user/dashboard/frontEnd';
      }
    });
    const userData = this.localstorageService.get('user');
    if(userData.labels[0]==='doctor')this.isDoctor=true;
  }


  toggleview(){
    this.navHidden = !this.navHidden;
  }


}
