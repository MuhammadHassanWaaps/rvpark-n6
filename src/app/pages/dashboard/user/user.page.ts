import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';
import { TransitionsPage } from '../transitions/transitions.page';
import { Router } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage extends BasePage implements OnInit {
  userData: any = null;
  loading = false;
  constructor(injector: Injector, public router: Router) {
    super(injector);
    this.initialize();
  }

  ngOnInit() {}

  async initialize() {
    this.loading = true;
    const res = await this.network.getUserData();
    console.log(res);
    this.userData = res;
    this.loading = false;
  }
  logout() {
    localStorage.removeItem('fcm_token');
    this.users.user = null;
    localStorage.clear();
    this.router.navigateByUrl(
      'pages/login',
      // By replacing the current URL in the history, we keep the Browser's Back
      // Button behavior in tact. This will allow the user to easily navigate back
      // to the previous URL without getting caught in a redirect.
      {
        replaceUrl: true,
      }
    );
    // this.nav.setRoot('pages/login');
  }

  async editProfile() {
    const res = await this.modals.present(UpdateProfileComponent);
    this.userData = await this.network.getUserData();
  }

  async openOrderHistory() {
    const res = await this.modals.present(OrderHistoryComponent, {
      type: 'order',
    });
  }
}
