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
      '01': 'Janvier',
      '02': 'Février',
      '03': 'Mars',
      '04': 'Avril',
      '05': 'Mai',
      '06': 'Juin',
      '07': 'Juillet',
      '08': 'Août',
      '09': 'Septembre',
      '10': 'Octobre',
      '11': 'Novembre',
      '12': 'Décembre'
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
      return _date + " à " + _hour
    } else {
      return _date
    }
  }
}
