import { SignupPageModule } from './../signup/signup.module';
import { SignupSlideComponent } from './signup-slide/signup-slide.component';
import { SignupSlideModule } from './signup-slide/signup-slide.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
