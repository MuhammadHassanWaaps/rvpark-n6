import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Config } from './../../../../config/main.config';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { DataService } from 'src/app/services/data.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-home-next-slider',
  templateUrl: './home-next-slider.component.html',
  styleUrls: ['./home-next-slider.component.scss'],
})
export class HomeNextSliderComponent extends BasePage implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 1,
  };
  slides: any[] = [];
  park_data: any[] = [];
  usertype;
  images: any[] = [];
  url;
  image_url;
  imageArray;
  // role_id: any;
  constructor(injector: Injector) {
    super(injector);
    this.slides = this.dataService.getHomeCategories();
  }

  ngOnInit() {
    this.url = Config.URL;
    this.usertype = localStorage.getItem('usertype');
    console.log(this.usertype);
    this.getRvSpots();

    // this.role_id = localStorage.getItem('role_id');
    // console.log('rokele', this.role_id);
  }

  activeIndex($event) {
    console.log($event);
    this.slides = this.slides.map((x) => {
      x.active = x.id == $event.id ? 1 : 0;
      return x;
    });
  }
  async getRvSpots() {
    let list = await this.network.getSpotlist().then((res) => {
      this.park_data = res;
      console.log('park_data', this.park_data);
      // this.imageArray = this.park_data.map(x => x.park_images[0])
      // console.log(this.imageArray);
    });
  }
  async menuDetails(item) {
    let id = item.id;
    this.nav.push('pages/menu-details', { item_id: id });
  }

  getImageUrl(item){

    if(item.park_images.length == 0){
      return 'assets/images/fl1.png';
    }

    if(item.park_images[0].image_url){
      return this.url + item.park_images[0].image_url
    }

    return 'assets/images/fl1.png'
  }
}
