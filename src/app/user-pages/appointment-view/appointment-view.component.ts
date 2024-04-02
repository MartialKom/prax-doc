import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss'],
})
export class AppointmentViewComponent implements OnInit {
  appointments: any[] = [];
  failedAppointments: any[] = [];
  isFailedAppointments: boolean = false;
  apointmentLoad: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const today = new Date();
    this.userService.getAllAppointments().then((response) => {
      if (response) {
        for (let app of response) {
          if (app['date'] > today && app['status'] === 'WAITING')
            this.failedAppointments.push(app);
          else if (app['status'] === 'WAITING') {
            this.appointments.push(app);
          }
        }
      }
    });
  }

  showFailed() {
    this.isFailedAppointments = true;
  }

  showAppointments() {
    this.isFailedAppointments = false;
  }

  validAppointment(app: any) {

    if(confirm("Do you really want to validate this appointment ?")){
      this.apointmentLoad = true;

      this.userService.validAppointment(app.$id).then((response) => {
        if (response) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Appointment validated',
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else this.apointmentLoad = false;
      });
    }

  }
}
