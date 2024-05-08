import { Component, OnInit } from '@angular/core';
import { HolidayRequest } from 'src/app/models/holidays.model';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-holidays-wiew',
  templateUrl: './holidays-wiew.component.html',
  styleUrls: ['./holidays-wiew.component.scss']
})
export class HolidaysWiewComponent implements OnInit {

  holidays: any[] = [];
  loadingHolidays: boolean = false;
  holidayRequest !: HolidayRequest;
  statuses!: any[];

  constructor(private userService: UserService){}

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
  deleteHoliday(id: any){
    if (
      confirm(
        `Are you sure you want to delete this holiday request ? `
      )
    ){
      this.loadingHolidays = true;
      this.userService.deleteHoliday(id).then(
        (response)=>{
          location.reload();
        }
      )
    }
  }

}
