import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SelectSpotComponent } from './select-spot.component';
import { CalendarModule } from 'ion2-calendar';



@NgModule({
  declarations: [SelectSpotComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    CalendarModule
  ],
  exports:[
    SelectSpotComponent
  ]
})
export class SelectSpotModule { }
