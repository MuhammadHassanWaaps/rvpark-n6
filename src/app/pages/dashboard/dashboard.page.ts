import { ChatPage } from './chat/chat.page';
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


    this.events.subscribe('dashboard:redirecttochannelpage', async (data) => {
      console.log(data);

      console.log("go to Home");

      // this.nav.push('pages/dashboard/chat');
      // await this.menuCtrl.close();
      // this.modals.present(ChatPage);

    });
  }

  async ngOnInit() {







  }

  async ionViewWillEnter() {

    await this.users.getUserRoleId();
    await this.users.getUser()

    await this.fcm.setupFMC();
    const token = localStorage.getItem('fcm_token');
    console.log("token",token);
    if(token){
      await this.network.setFcmToken({fcm_token: token}).then((res) => {
        console.log("responseOfToken",res)
      })
    }

    // check if channel id redirect is there
    let isM = localStorage.getItem('is_move_to_notifications');
    if(isM == 'yes'){
      let channel = localStorage.getItem('park_id');
      if(channel){
        this.modals.present(ChatPage);
      }

    }

  }

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
