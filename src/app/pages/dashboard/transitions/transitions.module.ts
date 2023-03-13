import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransitionsPageRoutingModule } from './transitions-routing.module';

import { TransitionsPage } from './transitions.page';
import { TransactionDetailsModule } from './transaction-details/transaction-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransitionsPageRoutingModule,
    TransactionDetailsModule
  ],
  declarations: [TransitionsPage]
})
export class TransitionsPageModule {}
