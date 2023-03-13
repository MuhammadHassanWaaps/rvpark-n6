import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { CcBoxLayoutModule } from 'src/app/components/cc-box-layout/cc-box-layout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    CcBoxLayoutModule,
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
