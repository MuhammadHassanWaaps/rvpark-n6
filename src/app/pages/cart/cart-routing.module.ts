import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSwitcherModule } from '../dashboard/components/home-switcher/home-switcher.module';

import { CartPage } from './cart.page';

const routes: Routes = [
  {
    path: '',
    component: CartPage,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes), HomeSwitcherModule],
  exports: [RouterModule],
})
export class CartPageRoutingModule {}
