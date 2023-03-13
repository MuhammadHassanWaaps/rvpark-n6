import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSpotComponent } from './add-spot.component';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { CalendarModule } from 'ion2-calendar';



@NgModule({
  declarations: [AddSpotComponent],
  imports: [
    CommonModule,IonicModule,ReactiveFormsModule,IconInputBoxModule,FormsModule,CalendarModule
  ],exports:[AddSpotComponent]
})
export class AddSpotModule { }
