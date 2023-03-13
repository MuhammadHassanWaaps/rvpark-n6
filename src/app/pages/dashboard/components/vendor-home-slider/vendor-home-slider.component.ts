import { NetworkService } from 'src/app/services/network.service';
import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-vendor-home-slider',
  templateUrl: './vendor-home-slider.component.html',
  styleUrls: ['./vendor-home-slider.component.scss'],
})
export class VendorHomeSliderComponent extends BasePage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @Output('selection') selection: EventEmitter<any> = new EventEmitter<any>();
  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 15,
    navigation: false,
    pagination: { clickable: false },
    scrollbar: { draggable: false },
  };
  slides: any[] = [];
  items: any[] = [];
  // role_id: any;
  park_data: any[] = [];

  constructor(injector: Injector) {
    super(injector);
    this.slides = this.dataService.getTacos();

    this.events.subscribe('reload-dashboard', () => {
      this.getRvSpots();
    });
  }

  ngOnInit() {
    this.getRvSpots();
    // this.role_id = localStorage.getItem('role_id');
  }

  activeIndex($event) {
    console.log($event);
    this.slides = this.slides.map((x) => {
      x.active = x.id == $event.id ? 1 : 0;
      return x;
    });
  }

  async getRvSpots() {
    if ((await this.users.getUserRoleId()) === '3') {
      const res = await this.network.getMylist();
      this.park_data = res;
    } else {
      const res = await this.network.getSpotlist();
      this.park_data = res;
    }

    // let list = await this.network.getSpotlist();
    // if(list.length > 0){
    //   this.park_data = list;
    // } else {
    //   this.park_data = [];
    // }
  }
  async menuDetails(item) {
    let id = item.id;
    this.nav.push('pages/menu-details', { item_id: id });
  }

  addNewPark() {
    this.nav.push('pages/dashboard/add-rv');
  }
}
