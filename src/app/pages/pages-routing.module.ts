import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pre-splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadChildren: () =>
      import('./splash/splash.module').then((m) => m.SplashPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'pre-login',
    loadChildren: () =>
      import('./pre-login/pre-login.module').then((m) => m.PreLoginPageModule),
  },
  {
    path: 'pre-splash',
    loadChildren: () => import('./pre-splash/pre-splash.module').then( m => m.PreSplashPageModule)
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
      canActivate:[AuthGuardService]
  },
  {
    path: 'menu-details',
    loadChildren: () => import('./menu-details/menu-details.module').then( m => m.MenuDetailsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },


  {
    path: 'privacy-policy',
    loadChildren: () => import('./dashboard/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'signup-slide2',
    loadChildren: () => import('./login/signup-slide2/signup-slide2.module').then( m => m.SignupSlide2Module)
  },
  // {
  //   path: 'location',
  //   loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
