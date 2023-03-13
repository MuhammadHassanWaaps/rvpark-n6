import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseHeaderComponent } from './base-header.component';
import { IonicModule } from '@ionic/angular';
import { IconInputBoxModule } from '../icon-input-box/icon-input-box.module';

@NgModule({
  declarations: [BaseHeaderComponent],
  imports:[
  CommonModule,
  IonicModule,
  IconInputBoxModule],
  
  exports: [BaseHeaderComponent],
})
export class BaseHeaderModule { }
