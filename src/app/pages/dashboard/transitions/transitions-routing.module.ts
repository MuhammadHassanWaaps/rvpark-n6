import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransitionsPage } from './transitions.page';

const routes: Routes = [
  {
    path: '',
    component: TransitionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransitionsPageRoutingModule {}
