import { Component, Injector, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {
  obje76: any[] = [];
  // role_id: any;
  title = 'RV Spots'
  constructor(injector: Injector) {
    super(injector);
  }

  async getParks() {

    if ((await this.users.getUserRoleId()) === '3') {
      const res = await this.network.getMylist();
      this.obje76 = res;
      this.title = 'My RV Spots'
    } else {
      const res = await this.network.getSpotlist();
      this.obje76 = res;
    }

    // const res = await this.network.getSpotlist();
    // this.obje76 = res;
  }
  async handleRefresh(event) {
    await this.users.getUser();
    await this.users.getUserRoleId();
    this.getParks();
    event.target.complete();
  };

  async ngOnInit() {
    await this.users.getUser();
    await this.users.getUserRoleId();
    this.getParks();
  }
  addNewPark() {
    this.nav.push('pages/dashboard/add-rv');
  }
  // openSelection($event) {
  //   console.log($event);
  //   this.nav.push('pages/menu-details', { item: JSON.stringify($event) });
  // }
}
