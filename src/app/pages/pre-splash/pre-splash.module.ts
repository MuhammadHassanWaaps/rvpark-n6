import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreSplashPageRoutingModule } from './pre-splash-routing.module';

import { PreSplashPage } from './pre-splash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreSplashPageRoutingModule
  ],
  declarations: [PreSplashPage]
})
export class PreSplashPageModule {}
