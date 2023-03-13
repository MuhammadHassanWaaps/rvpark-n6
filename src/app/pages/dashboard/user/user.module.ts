import { OrderHistoryComponent } from './order-history/order-history.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserPageRoutingModule,
    IconInputBoxModule
  ],
  declarations: [UserPage, UpdateProfileComponent, OrderHistoryComponent]
})
export class UserPageModule {}
