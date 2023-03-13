import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuySpotComponent } from './buy-spot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BuySpotComponent],
  imports: [
    CommonModule, FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],exports:[BuySpotComponent]
})
export class BuySpotModule { }
