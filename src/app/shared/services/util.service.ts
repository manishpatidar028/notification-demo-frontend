import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }


  /**
  * @purpose To get date.
  */
  getDate(date: number) {
    return moment(date).toDate();
  }
}
