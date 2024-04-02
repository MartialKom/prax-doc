import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';

@Component({
  selector: 'app-side-bar-dashboard',
  templateUrl: './side-bar-dashboard.component.html',
  styleUrls: ['./side-bar-dashboard.component.scss']
})
export class SideBarDashboardComponent implements OnInit {

  isDoctor: boolean = false;
  constructor(private localstorageService: LocalStorageService){}

  ngOnInit(): void {
    const userData = this.localstorageService.get('user');
    if(userData.labels[0]==='doctor')this.isDoctor=true;
  }

  isHiden: boolean = true;

  toggleview(){
    this.isHiden = !this.isHiden;
  }
}
