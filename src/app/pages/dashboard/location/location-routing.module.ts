import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcBoxLayoutModule } from 'src/app/components/cc-box-layout/cc-box-layout.module';

import { LocationPage } from './location.page';

const routes: Routes = [
  {
    path: '',
    component: LocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CcBoxLayoutModule],
  exports: [RouterModule],
})
export class LocationPageRoutingModule {}
