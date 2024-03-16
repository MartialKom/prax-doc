import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {

  constructor() { }

  format(date:string, use_time:boolean = true):string {

    if(date ===undefined || date ===null ){
      return '';
    }
    // Initialize the month object
    const monthNames: any = {
      '02': 'Februar',
      '01': 'Januar',
      '03': 'März',
      '04': 'April',
      '05': 'Mai',
      '06': 'Juni',
      '07': 'Juli',
      '08': 'August',
      '09': 'September',
      '10': 'Oktober',
      '11': 'November',
      '12': 'Dezember'
    };

    // Adjust for the time zone difference
    const offset:number = new Date().getTimezoneOffset() / 60; // Calculate the offset in hours
    const adjustedDate:Date = new Date(date);
    adjustedDate.setHours(adjustedDate.getHours() + offset);
    // Get the month and year from the adjusted date
    const month:string = ('0' + (adjustedDate.getMonth() + 1)).slice(-2);
    const year:number = adjustedDate.getFullYear();
    const _date:string = adjustedDate.getDate() + "-"+monthNames[month]+"-"+year;
    const _hour:string = adjustedDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    if (use_time) {
      return _date + " bei " + _hour
    } else {
      return _date
    }
  }
}
