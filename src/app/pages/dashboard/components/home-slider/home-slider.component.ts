import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  slides: any[] = [];
  constructor(private dataService: DataService) {
    this.slides = dataService.getHomeSlides();
  }

  ngOnInit() {}
}
