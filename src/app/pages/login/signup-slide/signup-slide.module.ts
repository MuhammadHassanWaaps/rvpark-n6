import { SignupSlide2Module } from './../signup-slide2/signup-slide2.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupSlideComponent } from './signup-slide.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { SignupSlide3Module } from '../signup-slide3/signup-slide3.module';

@NgModule({
  declarations: [SignupSlideComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IconInputBoxModule,
    SignupSlide2Module,
    SignupSlide3Module
  ],
  exports: [SignupSlideComponent],
})
export class SignupSlideModule {}
