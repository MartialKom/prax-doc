import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-holiday-view-admin',
  templateUrl: './holiday-view-admin.component.html',
  styleUrls: ['./holiday-view-admin.component.scss']
})
export class HolidayViewAdminComponent implements OnInit {


  holidays: any[] = [];
  loadingHolidays: boolean = false;
  statuses!: any[];


  constructor(private userService: UserService){}

  getSeverity(status: string) {
    switch (status) {
        case 'REJECTED':
            return 'danger';

        case 'VALIDATED':
            return 'success';

        case 'WAITING':
            return 'warning';
        default:
          return undefined;
    }
}

  ngOnInit(): void {
    
    this.loadingHolidays = true;
    
    this.statuses = [
      { label: 'REJECTED', value: 'REJECTED' },
      { label: 'VALIDATED', value: 'VALIDATED' },
      { label: 'WAITING', value: 'WAITING' }
  ];

    this.userService.getAllHolidays().then(
      (response)=>{
        if(response){
          this.holidays = response;

          this.loadingHolidays = false;
        } else this.loadingHolidays = false;
      }
    );

  }

  clear(table: Table) {
    table.clear();
}

  changeStatus(id: any, status: string){

    var text = "Sind Sie sicher, dass Sie diesen Urlaubsantrag ändern möchten ? ";

    if(status === 'VALIDATED') text = "Sind Sie sicher, dass Sie diesen Urlaubsantrag validieren möchten ? ";
    if(status === 'REJECTED') text = "Sind Sie sicher, dass Sie diesen Urlaubsantrag ablehnen wollen ? ";
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
