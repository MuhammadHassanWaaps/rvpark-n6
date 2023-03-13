import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultipleSpotComponent } from './multiple-spot.component';
import { GmapModule } from '../gmap/gmap.module';
import { AddSpotModule } from '../add-spot/add-spot.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';


@NgModule({
  declarations: [MultipleSpotComponent],
  imports: [
    CommonModule,IonicModule,AddSpotModule,IconInputBoxModule,FormsModule,ReactiveFormsModule
  ],exports:[MultipleSpotComponent]
})
export class MultipleSpotModule { }
