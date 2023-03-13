import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCategorySliderBoxesComponent } from './home-category-slider-boxes.component';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';
import { ItemBoxPhModule } from 'src/app/components/item-box-ph/item-box-ph.module';

@NgModule({
  declarations: [HomeCategorySliderBoxesComponent],
  imports: [CommonModule, SwiperModule, IonicModule, ItemBoxPhModule],
  exports: [HomeCategorySliderBoxesComponent],
})
export class HomeCategorySliderBoxesModule {}
