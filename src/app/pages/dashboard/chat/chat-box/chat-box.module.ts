import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box.component';
import { BaseHeaderModule } from 'src/app/components/base-header/base-header.module';




@NgModule({
  declarations: [ChatBoxComponent],
  imports: [
    CommonModule,FormsModule,IonicModule,
    BaseHeaderModule,
  ],exports:[ChatBoxComponent]
})
export class ChatBoxModule { }
