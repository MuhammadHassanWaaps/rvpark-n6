import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SignupSlide3Component } from './signup-slide3.component';

@NgModule({
  declarations: [SignupSlide3Component],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IconInputBoxModule,
  ],
  exports: [SignupSlide3Component],
})
export class SignupSlide3Module {}
