import { MenuDetailsPageModule } from './../../../menu-details/menu-details.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorHomeSliderComponent } from './vendor-home-slider.component';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';
import { CcBoxLayoutModule } from 'src/app/components/cc-box-layout/cc-box-layout.module';
import { ItemBoxPhModule } from 'src/app/components/item-box-ph/item-box-ph.module';

@NgModule({
  declarations: [VendorHomeSliderComponent],
  imports: [
    CommonModule,
    SwiperModule,
    IonicModule,
    CcBoxLayoutModule,
    ItemBoxPhModule,
    MenuDetailsPageModule
  ],
  exports: [
    VendorHomeSliderComponent
  ]
})
export class VendorHomeSliderModule { }
