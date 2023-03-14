import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDetailsPageRoutingModule } from './menu-details-routing.module';

import { MenuDetailsPage } from './menu-details.page';
import { MenuListItemsModule } from 'src/app/components/menu-list-items/menu-list-items.module';
// import { HomeCategorySliderComponent } from '../dashboard/components/home-category-slider/home-category-slider.component';
import { HomeCategorySliderModule } from '../dashboard/components/home-category-slider/home-category-slider.module';
import { HomePageModule } from '../dashboard/home/home.module';
import { HomeNextSliderModule } from '../dashboard/components/home-next-slider/home-next-slider.module';
import { SwiperModule } from 'swiper/angular';
import { DatePickerModule } from './date-picker/date-picker.module';
import { BuySpotModule } from './buy-spot/buy-spot.module';
import { SelectSpotModule } from './select-spot/select-spot.module';
import { ChatBoxModule } from '../dashboard/chat/chat-box/chat-box.module';
// import { BuySpotModule } from './buy-spot/buy-spot.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDetailsPageRoutingModule,
    MenuListItemsModule,
    HomeCategorySliderModule,
    HomeNextSliderModule,
    SwiperModule,
    DatePickerModule,
    // BuySpotModule
    BuySpotModule,
    SelectSpotModule,
    ChatBoxModule

  ],
  declarations: [MenuDetailsPage],
})
export class MenuDetailsPageModule {}
