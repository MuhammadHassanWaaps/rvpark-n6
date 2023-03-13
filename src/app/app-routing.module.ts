import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'packages',
    loadChildren: () => import('./pages/dashboard/packages/packages.module').then( m => m.PackagesPageModule)
  },
  // {
  //   path: 'chat',
  //   loadChildren: () => import('./pages/dashboard/chat/chat.module').then( m => m.ChatPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
