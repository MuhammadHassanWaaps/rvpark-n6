import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSwitcherComponent } from './home-switcher.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HomeSwitcherComponent],
  imports: [CommonModule, IonicModule],
  exports: [HomeSwitcherComponent],
})
export class HomeSwitcherModule {}
