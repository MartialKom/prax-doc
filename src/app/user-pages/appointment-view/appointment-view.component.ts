import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
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
  nonUsersAppointments: any[] = [];
  isFailedAppointments: boolean = false;
  isNonUser: boolean = false;
  apointmentLoad: boolean = false;
  constructor(
    private userService: UserService,
    private storage: LocalStorageService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.userService.getAllAppointments().then((response) => {
      if (response) {
        for (let app of response) {
          if (app['date'] < today.toISOString() && app['status'] === 'WAITING')
            this.failedAppointments.push(app);
          else if (app['status'] === 'WAITING') {
            this.appointments.push(app);
          }
        }
      }
    });

    this.userService.getAllNonUserAppointment().then((response) => {
      if (response) {
        this.nonUsersAppointments = response;
      }
    });
  }

  showFailed() {
    this.isFailedAppointments = true;
    this.isNonUser = false;
  }

  showNonUser() {
    this.isNonUser = true;
    this.isFailedAppointments = false;
  }
  showAppointments() {
    this.isFailedAppointments = false;
    this.isNonUser = false;
  }

  validAppointment(app: any) {
    if (confirm('Wollen Sie diesen Termin wirklich bestätigen?')) {
      this.apointmentLoad = true;

      this.userService.validAppointment(app.$id).then((response) => {
        if (response) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Termin validiert',
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

  validNonUserAppointment(app: any) {
    if (confirm('Wollen Sie diesen Termin wirklich bestätigen?')) {
      this.apointmentLoad = true;
      const title = 'Termin für Nichtnutzer: ' + app.name;

      const aujourdhui: Date = new Date();



      this.userService
        .createAdminAppointment(
          aujourdhui.toISOString().split('T')[0],
          '12:00',
          '12:30',
          title,
          app.phone
        )
        .then((response) => {
          if (response?.$id) {
            this.userService
              .ValidateNonUserAppointment(app.$id)
              .then((response) => {
                if (response.$id) {
                  this.storage.remove('Appointments');
                  this.storage.remove('events');

                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                } else {
                  this.apointmentLoad = false;
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Fehler bei der Validierung',
                    showConfirmButton: false,
                    timer: 3000,
                  });
                }
              });
          } else {
            this.apointmentLoad = false;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Fehler bei der Validierung',
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    }
  }
}
