import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetpasswordSlideComponent } from './forgetpassword-slide.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';

@NgModule({
  declarations: [ForgetpasswordSlideComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IconInputBoxModule,
  ],
  exports: [ForgetpasswordSlideComponent],
})
export class ForgetpasswordSlideModule {}
