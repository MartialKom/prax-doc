import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-holiday-view-admin',
  templateUrl: './holiday-view-admin.component.html',
  styleUrls: ['./holiday-view-admin.component.scss']
})
export class HolidayViewAdminComponent implements OnInit {


  holidays: any[] = [];
  loadingHolidays: boolean = false;


  constructor(private userService: UserService){}

  ngOnInit(): void {
    
    this.loadingHolidays = true;

    this.userService.getAllHolidays().then(
      (response)=>{
        if(response){
          this.holidays = response;

          this.loadingHolidays = false;
        } else this.loadingHolidays = false;
      }
    );

  }

  changeStatus(id: any, status: string){

    var text = "Are you sure you want to modify this holiday request ? ";

    if(status === 'VALIDATED') text = "Are you sure you want to validate this holiday request ? ";
    if(status === 'REJECTED') text = "Are you sure you want to reject this holiday request ? ";
    if (
      confirm(
        text
      )
    ){
      this.loadingHolidays =true;

      this.userService.changeStatus(id, status).then(
        (response) =>{
          if(response.$id){
            location.reload();
          }
        }
      )
    }

  }
}
