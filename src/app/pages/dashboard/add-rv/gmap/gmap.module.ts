import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmapComponent } from './gmap.component';



@NgModule({
  declarations: [GmapComponent],
  imports: [
    CommonModule,IonicModule
  ],exports:[GmapComponent]
})
export class GmapModule { }
