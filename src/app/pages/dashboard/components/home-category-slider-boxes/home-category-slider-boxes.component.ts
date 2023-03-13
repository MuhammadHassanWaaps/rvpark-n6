import { Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { DataService } from 'src/app/services/data.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-home-category-slider-boxes',
  templateUrl: './home-category-slider-boxes.component.html',
  styleUrls: ['./home-category-slider-boxes.component.scss'],
})
export class HomeCategorySliderBoxesComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    // slidesPerView: 2.5,
    // spaceBetween: 10,
    navigation: true,
    // pagination: { clickable: true },
    scrollbar: { draggable: true },
    breakpoints: {
      300: {
        slidesPerView: 1.75,
        spaceBetween: 10,
      },
      350: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      400: {
        slidesPerView: 2.25,
        spaceBetween: 10,
      },
      450: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      500: {
        slidesPerView: 2.75,
        spaceBetween: 10,
      },
      550: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      600: {
        slidesPerView: 3.25,
        spaceBetween: 10,
      },
      650: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      700: {
        slidesPerView: 3.75,
        spaceBetween: 10,
      },
      750: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      800: {
        slidesPerView: 4.25,
        spaceBetween: 10,
      },
      850: {
        slidesPerView: 4.5,
        spaceBetween: 10,
      },
      900: {
        slidesPerView: 4.75,
        spaceBetween: 10,
      },
      950: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1000: {
        slidesPerView: 5.25,
        spaceBetween: 10,
      },
      1050: {
        slidesPerView: 5.5,
        spaceBetween: 10,
      },
      1100: {
        slidesPerView: 5.75,
        spaceBetween: 10,
      },
      1150: {
        slidesPerView: 6,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 6.25,
        spaceBetween: 10,
      },

      // '@0.5': {
      //   slidesPerView: 2,
      //   spaceBetween: 20,
      // },
      // '@0.75': {
      //   slidesPerView: 2,
      //   spaceBetween: 20,
      // },
      // '@1.00': {
      //   slidesPerView: 3,
      //   spaceBetween: 40,
      // },
      // '@1.50': {
      //   slidesPerView: 4,
      //   spaceBetween: 50,
      // },
    },
  };
  slides: any[] = [];
  constructor(private nav: NavService, private dataService: DataService) {
    this.slides = dataService.getHomeCategoriesBoxed();
  }

  ngOnInit() {}

  activeIndex($event) {
    console.log($event);
    this.slides = this.slides.map((x) => {
      x.active = x.id == $event.id ? 1 : 0;
      return x;
    });
  }

  menuDetails() {
    this.nav.push('pages/menu-details');
  }
}
