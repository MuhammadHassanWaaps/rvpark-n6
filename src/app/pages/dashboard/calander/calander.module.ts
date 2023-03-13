import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalanderPageRoutingModule } from './calander-routing.module';

import { CalanderPage } from './calander.page';
import { MbscModule } from '@mobiscroll/angular';
import { CalendarModule } from 'ion2-calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalanderPageRoutingModule,
    MbscModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true
    })    
  ],
  declarations: [CalanderPage]
})
export class CalanderPageModule {}
