import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CclistComponent } from './cclist.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from '../../pipe/filter.pipe';



@NgModule({
  declarations: [CclistComponent,FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    // Ng2SearchPipeModule,
    
  ],
  exports: [
    CclistComponent
  ]
})
export class CclistModule { }
