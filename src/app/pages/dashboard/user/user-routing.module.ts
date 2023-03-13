import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
