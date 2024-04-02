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
import { UserService } from 'src/app/services/user-services/user.service';
import { HolidayRequest } from 'src/app/models/holidays.model';
@Component({
  selector: 'app-holidays-calendar-view',
  templateUrl: './holidays-calendar-view.component.html',
  styleUrls: ['./holidays-calendar-view.component.scss']
})
export class HolidaysCalendarViewComponent implements OnInit {

  events: EventInput[] = [];
  eventUpdated = {};
  loadingcalendar: boolean=false;
  holidayRequest !: HolidayRequest

  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: this.events, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventChange: this.handleUpdate.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  constructor(private userService: UserService){}

  ngOnInit(): void {

    this.loadingcalendar = true;
    this.userService.getAllHolidays().then(
      (response)=>{
        if(response){
          this.events = [];

          for(let hol of response){
            var color = "blue";
            if(hol['status']==='WAITING') color = "orange";
            if(hol['status']==='VALIDATED') color = "green";
            if(hol['status']==='REJECTED') color = "red";
            this.events.push({
              id: hol.$id,
              title: "Holidays "+hol['name']+" - "+hol['status'],
              start: hol['date'],
              end: hol['dateEnd'],
              color: color
            })
          }

          console.log('Taille events: ' + this.events.length);
          console.log('events: ' + this.events);

          this.calendarOptions.events = this.events;
          this.loadingcalendar = false;
        }
      }
    )
  }


  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo.startStr);
    console.log(selectInfo.endStr);

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); 

    if(
      confirm(
        'Are you sure you want to create the holiday ? '
      )
    ){
      this.loadingcalendar = true;

      this.holidayRequest = new HolidayRequest();

      this.holidayRequest.date = selectInfo.start;
      this.holidayRequest.dateEnd = selectInfo.end;

      this.userService.addHolidays(this.holidayRequest).then(
        (response) =>{
          if(response.$id){
            location.reload();
          }
        }
      )
    }

  }

  handleUpdate(events: EventChangeArg){
    if (
      confirm(
        'Are you sure you want to update the event ' + events.event.title
      )
    ) {
      this.loadingcalendar = true;
      this.userService.updateholiday(events.event.id, events.event).then(
        (response) =>{
          if(response.$id){
            location.reload();
          }
        }
      )
    }
  }

}
