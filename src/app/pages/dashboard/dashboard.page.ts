import { Component, Injector, OnInit } from '@angular/core';
import { initialize } from '@ionic/core';
import { ModalService } from 'src/app/services/basic/modal.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BasePage } from '../base-page/base-page';
import { CartPage } from '../cart/cart.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage extends BasePage implements OnInit {
  activeIndexId = 1;
  // role_id = 2;

  constructor(injector: Injector,public fcm: FirebaseService) {
    super(injector);
  }
 
  async ngOnInit() {
    console.log("dashboard",await this.users.getUserRoleId());
    console.log("user",await this.users.getUser())
    
    
    await this.fcm.setupFMC();
    const token = localStorage.getItem('fcm_token');
    console.log("token",token);
    if(token){
      await this.network.setFcmToken({fcm_token: token}).then((res) => {
        console.log("responseOfToken",res)
      }) }
  }

  ionViewWillEnter() {}

  activeIndex($event) {
    console.log("$event",$event);
    this.activeIndexId = $event.id;
    if ($event.label == 'Cart') {
      this.modals.present(CartPage);
    } else {
      this.nav.push($event.route);
    }
  }
}
