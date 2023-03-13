import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListItemsComponent } from './menu-list-items.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MenuListItemsComponent],
  imports: [CommonModule, IonicModule],
  exports: [MenuListItemsComponent],
})
export class MenuListItemsModule {}
