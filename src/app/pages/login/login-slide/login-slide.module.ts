import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSlideComponent } from './login-slide.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { IonicModule } from '@ionic/angular';
import { NgxPubSubModule, NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { EventsService } from 'src/app/services/events.service';

@NgModule({
  declarations: [LoginSlideComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IconInputBoxModule,
    NgxPubSubModule
  ],
  providers:[NgxPubSubService, EventsService],
  exports: [LoginSlideComponent],
})
export class LoginSlideModule {}
