import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcBoxLayoutComponent } from './cc-box-layout.component';
import { IonicModule } from '@ionic/angular';
import { ItemBoxPhModule } from '../item-box-ph/item-box-ph.module';

@NgModule({
  declarations: [CcBoxLayoutComponent],
  imports: [CommonModule, IonicModule, ItemBoxPhModule],
  exports: [CcBoxLayoutComponent],
})
export class CcBoxLayoutModule {}
