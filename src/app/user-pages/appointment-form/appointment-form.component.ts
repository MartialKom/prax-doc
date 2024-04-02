import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentRequest } from 'src/app/models/Appointment.model';
import { UserService } from 'src/app/services/user-services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit {
  loadingAppointments: boolean = false;
  appointments: any[] = [];
  selectedHour: any = "10:00";
  selectedEndHour: any = "10:30";
  request: AppointmentRequest | undefined;

  doctors: any[] = [];

  submitted: boolean = false;
  AppointmentForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    doctor: new FormControl('', Validators.required),
  });

  hours: any[] = [
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:30',
    '13:00',
    '14:00',
  ];
  indexSelected: any;

  constructor(
    private userService: UserService,
    private modalService: MatDialog
  ) {}

  openModal(content: any): void {
    const dialogRef = this.modalService.open(content);
  }

  hideModal() {
    this.submitted =false;
    this.modalService.closeAll();
  }

  async ngOnInit(): Promise<void> {
    this.loadingAppointments = true;
    await this.userService.getAppointments().then(async (response) => {
      if (response) {
        console.log('Appointments: ' + response);
        this.appointments = response;
        await this.userService.getAllDoctors().then(
          (response)=> {
            if (response){
              this.doctors = response;
            }
          }
        );
        this.loadingAppointments = false;
      } else this.loadingAppointments = false;
    });


  }

  selectHour(hour: any) {
    this.selectedHour = hour;
    console.log(hour);
  }

  selectEndHour(hour: any) {
    this.selectedEndHour = hour;
    console.log(hour);
  }

  submitAppointment() {

    this.submitted = true;
    if (!this.AppointmentForm.valid) {
      return;
    }

    this.hideModal();

    this.loadingAppointments = true

    this.request = new AppointmentRequest();

    this.request.age = this.AppointmentForm.get('age')?.value;
    this.request.contact = this.AppointmentForm.get('phone')?.value;
    this.request.date = this.AppointmentForm.get('startDate')?.value;
    this.request.name = this.AppointmentForm.get('name')?.value;
    this.request.time = this.selectedHour;
    this.request.endTime = this.selectedEndHour;
    this.request.email = this.AppointmentForm.get('email')?.value;
    this.request.idDoctor = this.AppointmentForm.get('doctor')?.value;
    this.userService.createAppointment(this.request).then(
      response => {
        if(response?.$id){
          location.reload();
        } else{
          this.loadingAppointments = false;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response,
            showConfirmButton: false,
            timer: 3000,
          });
        } 
      }
    )

  }


  deleteAppointment(id: any){

    Swal.fire({
      title: 'Sind Sie sicher?',
      text: 'Dass Sie diese Verabredung abschaffen wollen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      cancelButtonText: 'Nein',
      confirmButtonText: 'Ja',
    }).then((result) => {
      if (result.value) {
        this.loadingAppointments = true;

        this.userService.deleteAppointment(id).then(
          (response) => {
            if(response){
              location.reload();
            }
          }
        );
      }
    })


   
  }
}
