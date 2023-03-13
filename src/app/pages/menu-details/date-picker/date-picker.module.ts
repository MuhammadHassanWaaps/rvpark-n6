import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule 
  ],
  exports:[DatePickerComponent]
})
export class DatePickerModule { }
