import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-home-category-slider',
  templateUrl: './home-category-slider.component.html',
  styleUrls: ['./home-category-slider.component.scss'],
})
export class HomeCategorySliderComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  config: SwiperOptions = {
    slidesPerView: 3.5,
    spaceBetween: 12,
    navigation: true,
    // pagination: { clickable: true },
    scrollbar: { draggable: false },
  };
  slides: any[] = [];
  constructor(private dataService: DataService) {
    this.slides = dataService.getHomeCategories();
  }

  ngOnInit() {}

  activeIndex($event) {
    console.log($event);
    this.slides = this.slides.map((x) => {
      x.active = x.id == $event.id ? 1 : 0;
      return x;
    });
  }
}
