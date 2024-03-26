import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  loadingAppointments: boolean = false;
  appointments: any[] = [];
  selectedHour: any;
  hours: any[]=[
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:30",
    "13:00",
    "14:00"
  ]
  constructor(private userService : UserService){}

  async ngOnInit(): Promise<void> {
  this.loadingAppointments =true;
  await this.userService.getAppointments().then(
    (response)=>{
      if (response){
        console.log("Appointments: "+response);
        this.appointments = response;
        this.loadingAppointments= false;
      } else this.loadingAppointments =false;
    }
  )
}

selectHour(hour: any){
  this.selectHour = hour;
}



}
