import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PagesRoutingModule } from './pages-routing.module';
import { IconInputBoxModule } from '../components/icon-input-box/icon-input-box.module';
import { StatesCitiesModule } from './states-cities/states-cities.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    StatesCitiesModule,
    ReactiveFormsModule,
    IonicModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
