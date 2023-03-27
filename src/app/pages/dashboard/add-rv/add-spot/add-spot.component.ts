import { FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { Component, OnInit, Injectable, inject, Injector, Input } from '@angular/core';
import { MultipleSpotComponent } from '../multiple-spot/multiple-spot.component';
import { DatePickerComponent } from 'src/app/pages/menu-details/date-picker/date-picker.component';
import * as moment from 'moment';
import { DayConfig, CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.scss'],
})
export class AddSpotComponent extends BasePage implements OnInit {

  date_array: any;
  single_date;
  daily;
  weekly;
  monthly;
  spot_name;
  location = "USA";
  availability;
  start_Date;
  end_date;
  firstDate;
  secondDate;
  multidate : any[] = [];
  ctype = "daily";

  @Input() public park_id;
  @Input() public item;
  @Input() public edit = false;
  id;
  weeklyPackage = false;
  monthlyPackage = false;
  dailyPackage = false;

  aForm!: FormGroup;
  expression = false;
  dateRange;
  _daysConfig: DayConfig[] = [];
  type = 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'multi',
    // disableWeeks: [0, 1, 6],
    daysConfig: [],
  };


  constructor(injector: Injector) {
    super(injector);
    // this.setupForm();
  }

  ngOnInit() {
    console.log("park_id", this.park_id, this.item);

    this.initialize()

    if (this.edit == true && this.item && this.item.id) {
      this.id = this.item.id
      const data = this.item?.available_date[0];
      this.park_id = this.item?.park_id
      this.spot_name = this.item?.spot_name
      this.location = this.item?.spot_location
      this.start_Date = data?.available_spot_date
      this.daily = data?.daily_price
      this.weekly = data?.weekly_price
      this.monthly = data?.monthly_price
      this.date_array = this.start_Date
    }

    this.expression = true;

  }

  ctyleChange($event){
    console.log("event" , $event);
    if($event == true)
    {
      this.ctype = "weekly"
      return;
    }
    if($event == true)
    {
      this.ctype = "monthly"
      return;
    }
    let v = $event.target.value;
    console.log(v);
    this.expression = false;
    switch(this.ctype){
      case "daily":
        this.optionsRange.pickMode = 'multi';
      break;
      case "weekly":
        this.optionsRange.pickMode = 'multi';
      break;
      case "monthly":
        this.optionsRange.pickMode = 'range';
      break;
    }
    setTimeout( () => {
      this.expression = true;
    }, 1000)
  }

  async initialize() {
    // this.setupForm();

    // this.dateRange = { from: moment().format(), to: moment().add(2, 'months') };

    // for (let i = 0; i < 5; i++) {
    //   this._daysConfig.push({
    //     date: moment().add(i, 'days').toDate(),
    //     subTitle: `n-a`,
    //     disable: true
    //   })
    // }



    // this.optionsRange['daysConfig'] = this._daysConfig

  }

  getSetDates($event){

    console.log($event);
    let range = $event
    // return;
    switch(this.ctype){
      case "daily":
        this.multidate = range.sort((a, b) => a.unix() - b.unix());

        if(this.multidate.length > 0 ){
          this.start_Date = this.multidate[0].format('YYYY-MM-DD');
          this.end_date = this.multidate[this.multidate.length-1].format('YYYY-MM-DD');
          console.log(this.start_Date, this.end_date, this.multidate)
        }

        if(this.multidate.length >= 6 && this.multidate.length <= 28){
          this.ctype = 'weekly'
        }
      break;
      case "weekly":


        this.multidate = range.sort((a, b) => a.unix() - b.unix());

        if(this.multidate.length > 0 ){
          this.start_Date = this.multidate[0].format('YYYY-MM-DD');
          this.end_date = this.multidate[this.multidate.length-1].format('YYYY-MM-DD');
          console.log(this.start_Date, this.end_date, this.multidate)
        }


        // this.start_Date = range.from.format('YYYY-MM-DD');
        // this.end_date = range.to.format('YYYY-MM-DD');
      break;
      case "monthly":
        this.start_Date = range.from.format('YYYY-MM-DD');
        this.end_date = range.to.format('YYYY-MM-DD');
      break;
    }


    switch(this.ctype){
      case "daily":
        // this.end_date = range.from.add(1, 'day').subtract(1, 'day').format('YYYY-MM-DD');
      break;
      case "weekly":
        // this.end_date = range.from.add(1, 'week').subtract(1, 'day').format('YYYY-MM-DD');
      break;
      case "monthly":
        this.end_date = range.from.add(1, 'month').subtract(1, 'day').format('YYYY-MM-DD');
      break;
    }

    this.dateRange = null;
    this.dateRange = (this.ctype == "daily" || this.ctype == "weekly") ? null : { from: moment(this.start_Date), to: moment(this.end_date) };


    // if(!this.dateRange){
    //   return;
    // }
    let dobj = {
      detail: {
        value: this.start_Date
      }
    }

    let eobj = {
      detail: {
        value: this.end_date
      }
    }

    console.log(dobj, eobj);
    if(this.ctype == "monthly" ){
      this.startDateChange(dobj);
      this.endDateChange(eobj);
    }

  }


  availabilityChange($event) {
    this.availability = $event.detail.value;
    console.log($event.detail.value);
  }
  inputChange($event, type) {
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }

  back() {
    console.log('tjhis sjdsdasdas');
    this.modals.dismiss();
  }

  isDailyPackageDone(){


    let flag = this.start_Date && this.end_date;
    return flag;
  }

  async addLocation() {

    if (this.edit === true) {
      let data = {
        id: this.id,
        park_id: this.park_id,
        spot_name: this.spot_name,
        spot_location: this.location,
        available_spot_date: [{
          starting_date: this.start_Date,
          ending_date: this.end_date,
          daily_price: this.daily,
          weekly_price: this.weekly,
          monthly_price: this.monthly
        }]
      };
      const res = await this.network.updateSpots(data)
      this.modals.dismiss();
    } else {

      // specific work for daily multiselect







      if (
        this.park_id === "" || this.park_id === " " || this.park_id === undefined ||
        this.spot_name === "" || this.spot_name === " " || this.spot_name === undefined ||
        // this.location === "" || this.location === " " || this.location === undefined ||
        this.start_Date === "" || this.start_Date === " " || this.start_Date === undefined ||
        this.end_date === "" || this.end_date === " " || this.end_date === undefined ||
        this.daily === "" || this.daily === " " || this.daily === undefined ||
        this.weekly === "" || this.weekly === " " ||
        this.monthly === "" || this.monthly === " "
      ) {
        console.log("data", this.park_id, this.spot_name, this.location, this.start_Date, this.end_date, this.daily, this.weekly, this.monthly);

        this.alert.showAlert("Enter Details")
      } else {

        let datesArrayObj: any[] = [];
        let data: any = {
          park_id: this.park_id,
          spot_name: this.spot_name,
          spot_location: this.location ?? "USA",
          available_spot_date: []
        };


        if(this.ctype == "weekly"){

          if(this.multidate.length != 7){
            this.utility.presentFailureToast("Please select seven days in total");
            return;
          }

          if(this.multidate.length > 0 ){

            for(var i = 0; i < this.multidate.length; i++){

              let obj = {
                starting_date: moment(this.multidate[i]).format('YYYY-MM-DD'),
                ending_date: moment(this.multidate[i]).format('YYYY-MM-DD'),
                daily_price: this.daily ? this.daily : "",
                weekly_price: this.weekly ? this.weekly : "",
                monthly_price: this.monthly ? this.monthly : ""
              }

              data.available_spot_date.push(obj);

            }


          }



        } else

        if(this.ctype == "daily"){

          if(this.multidate.length > 0 ){

            for(var i = 0; i < this.multidate.length; i++){

              let obj = {
                starting_date: moment(this.multidate[i]).format('YYYY-MM-DD'),
                ending_date: moment(this.multidate[i]).format('YYYY-MM-DD'),
                daily_price: this.daily ? this.daily : "",
                weekly_price: this.weekly ? this.weekly : "",
                monthly_price: this.monthly ? this.monthly : ""
              }

              data.available_spot_date.push(obj);

            }


          }



        } else {

          datesArrayObj = [{
            starting_date: this.start_Date,
            ending_date: this.end_date,
            daily_price: this.daily ? this.daily : "",
            weekly_price: this.weekly ? this.weekly : "",
            monthly_price: this.monthly ? this.monthly : ""
          }];

          data.available_spot_date = datesArrayObj;

        }

        const res = await this.network.addSpots(data)
        this.modals.dismiss();




      }

    }
  }
  closeModal() {
    this.modals.dismiss();
  }
  async selectDate($event) {
    console.log($event);
    this.date_array = $event.detail.value;
    this.daily = this.date_array[0];
    this.weekly = this.date_array[1];
  }
  startDateChange($event) {
    this.daily = $event.detail.value;
    console.log("daily", this.daily);
  }
  endDateChange($event) {

    // const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // this.firstDate = new Date(this.daily);
    // this.secondDate = new Date($event.detail.value);
    // const diffDays = Math.round(Math.abs((this.firstDate - this.secondDate) / oneDay));
    // console.log("diffDays", diffDays);


    // if (this.multidate.length > 0) {
    //   this.dailyPackage = true;
    // }
    // else {
    //   this.dailyPackage = false;
    // }

    // if (this.multidate.length > 6 && this.multidate.length <= 28) {
    //   this.weeklyPackage = true;
    //   if(this.weeklyPackage = true)
    //   {
    //     this.ctyleChange(this.weeklyPackage)
    //   }
    // }
    // else {
    //   this.weeklyPackage = false;
    // }

    // if (diffDays > 28) {
    //   this.monthlyPackage = true;
    //   if(this.monthlyPackage = true)
    //   {
    //     this.ctyleChange(this.monthlyPackage)
    //   }
    // }
    // else {
    //   this.monthlyPackage = false;
    // }
  }
}
