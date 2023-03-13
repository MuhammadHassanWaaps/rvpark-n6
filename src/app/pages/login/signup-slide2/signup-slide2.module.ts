import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupSlide2Component } from './signup-slide2.component';
import { SignupSlide3Module } from '../signup-slide3/signup-slide3.module';

@NgModule({
  declarations: [SignupSlide2Component],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IconInputBoxModule,
    SignupSlide3Module,
  ],
  exports: [SignupSlide2Component],
})
export class SignupSlide2Module {}
