import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconInputBoxComponent } from './icon-input-box.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [IconInputBoxComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [IconInputBoxComponent],
})
export class IconInputBoxModule {}
