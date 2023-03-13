import { DatePickerComponent } from '../date-picker/date-picker.component';
// import { DatePickerComponent } from './../date-picker/date-picker.component';
import { BasePage } from 'src/app/pages/base-page/base-page';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Injector,
  Injectable,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-buy-spot',
  templateUrl: './buy-spot.component.html',
  styleUrls: ['./buy-spot.component.scss'],
})
export class BuySpotComponent extends BasePage implements OnInit {
  // @Output('toCheckout') toCheckout: EventEmitter<any> = new EventEmitter<any>();
  // @Output('toOut') toOut: EventEmitter<any> = new EventEmitter<any>();
  spots;
  available_dates;
  park_id;
  spot_name;
  location;
  stock_price;
  arr: any[] = [];
  availableDate_loop: any[] = [];
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    const data = this.nav.getQueryParams();
    // this.spots = JSON.parse(data['item']);
    // this.park_id = this.spots[0].park_id;
    // this.available_dates = this.spots[0].available_date;
    // console.log(this.spots);

    // this.availableDate_loop = this.spots.map((x) => x.available_date);
    // console.log(this.availableDate_loop);

  }
  back() {
    this.nav.pop();
  }
  async toggleDate() {
    let data = await this.modals.present(
      DatePickerComponent,
      {},
      'transparent-modal'
    );
  }

  async getAvailableSpots(event) {
    console.log(event);
    this.available_dates = event.detail.value;
    console.log(this.available_dates);

    let data = {
      park_id: this.park_id,
      available_spot_date: this.available_dates,
    };
    await this.network.postAvailableSpot(data).then((res) => {
      console.log(res);
      this.spot_name = res.data[0].available_date_spots.spot_name;
      console.log(this.spot_name);
    });
  }
}
