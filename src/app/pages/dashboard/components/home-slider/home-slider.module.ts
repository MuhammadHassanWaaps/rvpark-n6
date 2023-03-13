import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSliderComponent } from './home-slider.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [HomeSliderComponent],
  imports: [CommonModule, SwiperModule],
  exports: [HomeSliderComponent],
})
export class HomeSliderModule {}
