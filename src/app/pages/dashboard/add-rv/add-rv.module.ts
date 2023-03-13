import { SwiperModule } from 'swiper/angular';
import { BaseHeaderModule } from 'src/app/components/base-header/base-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRvPageRoutingModule } from './add-rv-routing.module';

import { AddRvPage } from './add-rv.page';
import { HomeSwitcherModule } from '../components/home-switcher/home-switcher.module';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { MultipleSpotModule } from './multiple-spot/multiple-spot.module';
import { AddSpotModule } from './add-spot/add-spot.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddRvPageRoutingModule,
    HomeSwitcherModule,
    BaseHeaderModule,
    IconInputBoxModule,
    MultipleSpotModule,
    AddSpotModule,
    SwiperModule
  ],
  declarations: [AddRvPage],
})
export class AddRvPageModule {}
