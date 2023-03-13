import { Component, OnInit, ViewChild } from '@angular/core';
import { setOptions, MbscDatepicker } from '@mobiscroll/angular';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar/dist/calendar.model';
import * as moment from 'moment';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

@Component({
  selector: 'app-calander',
  templateUrl: './calander.page.html',
  styleUrls: ['./calander.page.scss'],
})
export class CalanderPage implements OnInit {
  @ViewChild('picker', { static: false })
  inst!: MbscDatepicker;

  today = new Date();
  dateRange;
  _daysConfig: DayConfig[] = [];
  type = 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    disableWeeks: [0, 1, 6],
    daysConfig: [],    
  };

  constructor() {
    this.dateRange = { from: moment().format(), to: moment().add(2, 'months') };

    for (let i = 0; i < 5; i++) {
      this._daysConfig.push({
        date: moment().add(i, 'days').toDate(),
        subTitle: `n-a`,
        disable: true,
        cssClass: 'mark-in-middle'
      })
    }



    this.optionsRange['daysConfig'] = this._daysConfig
  }

  ngOnInit() {
  }
  openPicker(): void {
    this.inst.open();

  }
  effect($event){
   console.log($event);
   
    
  }
}
