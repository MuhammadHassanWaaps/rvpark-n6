import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuPageModule),
      },
      {
        path: 'location',

        loadChildren: () =>
          import('./location/location.module').then(
            (m) => m.LocationPageModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserPageModule),
      },
      {
        path: 'add-rv',
        loadChildren: () =>
          import('./add-rv/add-rv.module').then((m) => m.AddRvPageModule),
      },
      {
        path: 'transitions',
        loadChildren: () =>
          import('./transitions/transitions.module').then(
            (m) => m.TransitionsPageModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
      },
    ],
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },{
    path: 'calander',
    loadChildren: () => import('./calander/calander.module').then( m => m.CalanderPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
