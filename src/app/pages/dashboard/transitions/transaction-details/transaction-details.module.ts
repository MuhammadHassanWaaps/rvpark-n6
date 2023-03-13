import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDetailsComponent } from './transaction-details.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TransactionDetailsComponent],
  imports: [
    CommonModule,IonicModule
  ],exports:[TransactionDetailsComponent]
})
export class TransactionDetailsModule { }
