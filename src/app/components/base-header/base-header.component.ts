import { NotificationsPage } from './../../pages/dashboard/notifications/notifications.page';
import { UserService } from 'src/app/services/user.service';
import { NetworkService } from './../../services/network.service';
import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CartPage } from 'src/app/pages/cart/cart.page';
import { ModalService } from 'src/app/services/basic/modal.service';
import { StatesCitiesComponent } from 'src/app/pages/states-cities/states-cities.component';
import { NavService } from 'src/app/services/basic/nav.service';
import { EventsService } from 'src/app/services/basic/events.service';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss'],
})
export class BaseHeaderComponent implements OnInit {
  @Input() item

  @Input('title') title = 'Where to?';
  @Input('subtitle') subtitle = 'Tap Here to Search Location';
  selectedState: any;
   


  constructor(private modals: ModalService, private menuCtrl: MenuController, public events: EventsService, public users: UserService, public nav: NavService) { }

  async ngOnInit() {
     this.item
    console.log("my city",this.item);
    
    console.log("header", await this.users.getUserRoleId())
    console.log("user", await this.users.getUser())
  }
  ionViewWillEnter() {
    

  }

  addToCart() {
    // this.nav.push('pages/cart');
    this.modals.present(CartPage);
  }

  async menuToggle() {
    console.log("am i clicked")
    console.log(await this.menuCtrl.toggle())
    this.menuCtrl.open('main-content');
  }

  async showNotificaitons() {
    const res = await this.modals.present(NotificationsPage);
  }
  async openSC() {
    const res = await this.modals.present(StatesCitiesComponent);
    console.log(res);

    if(res && res.data && res.data.item){
      const f = res.data.item;
      console.log(f);
      let str = f.city.name + ", " + f.state.name;
      this.subtitle = str;

      this.nav.push('pages/dashboard/location', {
        city_name: f.city.name
      });

      setTimeout( () => {
        let obj = {
          city_name: f.city.name
        }
        this.events.publish('location_changed', obj);
      }, 500);

    }







  }
}