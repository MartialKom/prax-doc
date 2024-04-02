import { Component, ChangeDetectorRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
  EventChangeArg,
  Calendar,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { UserService } from 'src/app/services/user-services/user.service';
import { LocalStorageService } from 'src/app/services/commons/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentRequest } from 'src/app/models/Appointment.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-full-calendar',

  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
})
export class FullCalendarComponentClass implements OnInit {
  events: EventInput[] = [];
  eventUpdated = {};

  @ViewChild('patient') modalPatient!: ElementRef;

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'timeGridWeek',
    initialEvents: this.events, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.handleUpdate.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];
  loadingcalendar: boolean=false;
  appointments: any[] = [];
  selectedAppointment: any;
  appointmentRequest: AppointmentRequest | undefined;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private userService: UserService,
    private storage: LocalStorageService,
    private modalService: MatDialog
  ) {}


  openModal(content: any): void {
    const dialogRef = this.modalService.open(content);
  }

  hideModal() {
    this.modalService.closeAll();
  }

  ngOnInit(): void {
    const userData = this.storage.get('user');
    const userId = userData.$id;
      this.userService.getAllAppointments().then((response) => {
        if (response) {
          this.appointments = response;
          this.storage.set("Appointments", response);
          this.events = [];
          for (let app of response) {
            var color = "green";
            if(app['status'] ==="VALIDATED"){
              if(app['idUser']=== userId ) color = "purple";
              if((app['idUser'] === app['idDoctor']) && app['idUser'] !== userId) color = "orange";
              this.events.push({
                id: app.$id,
                title: app['name'],
                start: app['date'].split('T')[0] + 'T' + app['time'],
                end: app['date'].split('T')[0] + 'T' + app['timeEnd'],
                allDay: app['allDay'],
                color: color
              });
            }

          }
          console.log('Taille events: ' + this.events.length);
          console.log('events: ' + this.events);

          this.calendarOptions.events = this.events;
          this.storage.set("events",this.events);
        }
      });
    
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); 

    if (title) {
      this.loadingcalendar =true;

      this.userService.createAdminAppointment(selectInfo.startStr.split("T")[0],selectInfo.startStr.split("T")[1],selectInfo.endStr.split("T")[1],title).then(
        response => {
          if(response?.$id){
            this.storage.remove("Appointments");
            this.storage.remove("events");
            this.ngOnInit();
            this.loadingcalendar = false;

          }else{
            this.loadingcalendar = false;
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
  }

  handleEventClick(clickInfo: EventClickArg) {

    for(let app of this.appointments){      
      
      if(app.$id === clickInfo.event.id){
        this.selectedAppointment = app;
       console.log("Find...."+this.selectedAppointment);
       this.openModal(this.modalPatient);
      }
    }
    
  }

  deleteEvent(){
    if (
      confirm(
        `Are you sure you want to delete the event '${this.selectedAppointment.name}'`
      )
    ) {
      this.hideModal();
      this.loadingcalendar = true;
      this.userService.deleteAppointment(this.selectedAppointment.$id).then(
        response =>{
          if(response){
            this.storage.remove("Appointments");
            this.storage.remove("events");
            this.ngOnInit();
            this.loadingcalendar = false;
          }
        }
      )
    }
  }

  handleUpdate(events: EventChangeArg) {
    if (
      confirm(
        'Are you sure you want to update the event ' + events.event.title
      )
    ) {
      this.loadingcalendar = true;
      this.userService.updateEvent(events.event.id, events.event).then(
        response => {
          if(response){
            this.storage.remove("Appointments");
            this.storage.remove("events");
            this.ngOnInit();
            this.loadingcalendar = false;
          }
        }
      )
    } else location.reload();
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
