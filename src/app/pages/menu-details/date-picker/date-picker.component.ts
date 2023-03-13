import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import * as moment from 'moment';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {

  dateTime = new Date().toISOString();

  constructor(private modals: ModalService) { }
  ngOnInit() { }

  selectMultipleDate() {
    this.modals.dismiss({ date: this.dateTime });
  }

}
