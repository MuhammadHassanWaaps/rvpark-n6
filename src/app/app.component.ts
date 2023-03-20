import { ChatPage } from './pages/dashboard/chat/chat.page';
import { UserService } from 'src/app/services/user.service';
import { NetworkService } from 'src/app/services/network.service';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { BasePage } from './pages/base-page/base-page';
import { CartPage } from './pages/cart/cart.page';
import { HomePage } from './pages/dashboard/home/home.page';
import { ModalService } from './services/basic/modal.service';
import { NavService } from './services/basic/nav.service';
import { UtilityService } from './services/utility.service';
import { Router } from '@angular/router';
import { TransitionsPage } from './pages/dashboard/transitions/transitions.page';
import { OrderHistoryComponent } from './pages/dashboard/user/order-history/order-history.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {

  // role_id = 2;
  isModalOpen;
  @Output('activeIndex') activeIndex: EventEmitter<any> =
    new EventEmitter<any>();
  constructor(public menuCtrl: MenuController,  private router: Router, public platform: Platform, public utility: UtilityService, private modalController: ModalController, private modals: ModalService, public nav: NavService, public users: UserService) {
    this.get();

    platform.ready().then(() => {
      this.initialize();
    });
    document.addEventListener(
      'backbutton',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        const url = this.router.url;
        console.log(url);
        this.createBackRoutingLogics(url);
      },
      false
    );

  }

  initialize() {
    if (
      this.platform.is('cordova') ||
      this.platform.is('ios') ||
      this.platform.is('android')
    ) {
      this.initializeApp();
    }
  }

  initializeApp() {
    console.log("initsjadfklasjd");

    this.platform.ready().then(async () => {
      // await this.fcm.setupFMC();
    });
  }

  async createBackRoutingLogics(url) {
    if (
      url.includes('login') ||
      url.includes('signup') ||
      url.includes('dashboard') ||
      url.includes('home') ||
      url.includes('tutorial') ||
      url.includes('stripe-payment')
    ) {
      this.utility.hideLoader();

      const isModalOpen = await this.modalController.getTop();
      console.log(isModalOpen);
      if (isModalOpen) {
        this.modalController.dismiss({ data: 'A' });
      } else {
        this.exitApp();
      }
    } else {
      if (this.isModalOpen) {
      }
    }
  }

  exitApp() {
    navigator['app'].exitApp();
  }

  async get(){
    console.log("dashboard",await this.users.getUserRoleId());
    console.log("user",await this.users.getUser())
  }

  // async checkMenuForRole(){
  //   const res = await this.users.role_id;
  //   this.role_id = res;
  // }

  openMenu() {
    this.menuCtrl.toggle()
  }
  gotoCart() {
    console.log("go to cart");

    this.modals.present(CartPage);
    this.menuCtrl.close()
  }
  gotoExplore() {
    console.log("go to Explore")

    // this.activeIndex.emit(item);
    // this.modals.present(Explore);

    this.nav.push('pages/dashboard/location');
    this.menuCtrl.close()
  }
  gotoHome() {
    console.log("go to Home")

    this.nav.push('pages/dashboard/home');
    this.menuCtrl.close()
  }
  async openChat() {
    console.log("go to Home")

    // this.nav.push('pages/dashboard/chat');
    await this.menuCtrl.close();
    this.modals.present(ChatPage );
  }
  gotoPrivacyPolicy() {
    console.log("go to privacy policy")

    this.nav.push('pages/dashboard/privacy-policy');
    this.menuCtrl.close()
  }

  async gotoTransection() {
    const res = await this.modals.present(TransitionsPage, {
      type: 'order',
      isModal: true
    });

    this.menuCtrl.close()
  }

  async openOrderHistory() {
    const res = await this.modals.present(OrderHistoryComponent, {
      type: 'order',
    });
  }

  gotoCalander() {
    console.log('go to Calander')

    this.nav.push('pages/dashboard/calander');
    this.menuCtrl.close()
  }

  logout() {

    this.users.user = null;
    localStorage.clear();
    this.nav.setRoot('pages/login');
    this.menuCtrl.close()
  }
}
