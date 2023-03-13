import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends BasePage implements OnInit {

  list: any[] = [];
  loading = false;
  constructor(injector: Injector) {
    super(injector);
    this.initialize()
  }

  ngOnInit() {
    console.log("ping")
  }

  async initialize(){
    this.loading = true;
    const res = await this.network.getMyNotifications();
    console.log('thisdas',res);

    this.list = res;
    this.loading = false;

  }

  back(){
    this.modals.dismiss();
  }

}
