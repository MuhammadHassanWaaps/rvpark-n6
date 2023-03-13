import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { StatesCitiesComponent } from './states-cities.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [StatesCitiesComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconInputBoxModule,
    ReactiveFormsModule
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports:[StatesCitiesComponent]
  
})

export class StatesCitiesModule { }
