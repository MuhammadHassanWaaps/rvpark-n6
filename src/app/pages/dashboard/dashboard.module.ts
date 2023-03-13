import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { BaseHeaderModule } from 'src/app/components/base-header/base-header.module';
import { HomeSwitcherModule } from './components/home-switcher/home-switcher.module';
// import { PrivacyPolicyPipe } from './privacy-policy.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    BaseHeaderModule,
    HomeSwitcherModule,
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
