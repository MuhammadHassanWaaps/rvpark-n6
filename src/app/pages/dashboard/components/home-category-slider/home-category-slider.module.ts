import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCategorySliderComponent } from './home-category-slider.component';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HomeCategorySliderComponent],
  imports: [CommonModule, SwiperModule, IonicModule],
  exports: [HomeCategorySliderComponent],
})
export class HomeCategorySliderModule {}
