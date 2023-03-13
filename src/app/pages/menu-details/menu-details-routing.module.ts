import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuySpotComponent } from './buy-spot/buy-spot.component';
// import { BuySpotComponent } from './buy-spot/buy-spot.component';

import { MenuDetailsPage } from './menu-details.page';
import { SelectSpotComponent } from './select-spot/select-spot.component';

const routes: Routes = [
  {
    path: '',
    component: MenuDetailsPage,
    // children:[
    //   {
    //     path: 'buy-spot',
    //     loadChildren: () =>
    //     import('../menu-details/buy-spot/buy-spot.module').then((m) => m.BuySpotModule),
    //   },

    // ]
  },
  {
    path: "buy-spot",
    component: BuySpotComponent
  },
  {
    path: "select-spot",
    component: SelectSpotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDetailsPageRoutingModule {}
