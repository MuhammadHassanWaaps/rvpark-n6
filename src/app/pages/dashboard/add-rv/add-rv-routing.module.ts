import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRvPage } from './add-rv.page';

const routes: Routes = [
  {
    path: '',
    component: AddRvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRvPageRoutingModule {}
