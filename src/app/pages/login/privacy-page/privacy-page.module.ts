import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PrivacyPageComponent } from './privacy-page.component';



@NgModule({
  declarations: [PrivacyPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[
    PrivacyPageComponent
  ]
})
export class PrivacyPageModule { }
