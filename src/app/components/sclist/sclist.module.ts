import { SclistComponent } from './sclist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterPipe } from '../../pipe/filter.pipe';



@NgModule({
  declarations: [SclistComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    SclistComponent
  ]
})
export class SclistModule { }
