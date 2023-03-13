import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreSplashPage } from './pre-splash.page';

const routes: Routes = [
  {
    path: '',
    component: PreSplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreSplashPageRoutingModule {}
