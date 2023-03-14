import { UserService } from 'src/app/services/user.service';
import { NetworkService } from 'src/app/services/network.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SSL_OP_NO_TLSv1_1 } from 'constants';

@Component({
  selector: 'app-home-switcher',
  templateUrl: './home-switcher.component.html',
  styleUrls: ['./home-switcher.component.scss'],
})
export class HomeSwitcherComponent implements OnInit {

  menulist: any[] = [];
  roleId = 1;
  menulistUser = [
    {
      id: 1,
      label: 'Home',
      icon: 'assets/images/home/footer/home.svg',
      icon_active: 'assets/images/home/footer/home-active.svg',
      active: 0,
      route: 'pages/dashboard/home',
    },
    {
      id: 2,
      label: 'Explore',
      icon: 'assets/images/search_navbar.png',
      icon_active: 'assets/images/active_explore.png',
      active: 0,
      route: 'pages/dashboard/location',
    },
    // {
    //   id: 3,
    //   label: 'Chat',
    //   icon: 'assets/images/home/footer/addrv.svg',
    //   icon_active: 'assets/images/home/footer/addrv-active.svg',
    //   active: 0,
    //   route: 'pages/dashboard/chat',
    // },
    {
      id: 3,
      label: 'Cart',
      icon: 'assets/images/cart_navbar.png',
      icon_active: 'assets/images/cart_navbar.png',
      active: 0,
      route: 'pages/cart',
    },
    {
      id: 4,
      label: 'User',
      icon: 'assets/images/home/footer/user.svg',
      icon_active: 'assets/images/home/footer/user-active.svg',
      active: 0,
      route: 'pages/dashboard/user',
    },
  ];

  menulistVendor = [
    {
      id: 1,
      label: 'Home',
      icon: 'assets/images/home/footer/home.svg',
      icon_active: 'assets/images/home/footer/home-active.svg',
      active: 0,
      route: 'pages/dashboard/home',
    },
    {
      id: 2,
      label: 'Add Rv',
      icon: 'assets/images/home/footer/addrv.svg',
      icon_active: 'assets/images/home/footer/addrv-active.svg',
      active: 0,
      route: 'pages/dashboard/add-rv',
    },
    // {
    //   id: 3,
    //   label: 'Chat',
    //   icon: 'assets/images/home/footer/addrv.svg',
    //   icon_active: 'assets/images/home/footer/addrv-active.svg',
    //   active: 0,
    //   route: 'pages/dashboard/chat',
    // },
    {
      id: 4,
      label: 'Transitions',
      icon: 'assets/images/home/footer/transitions.svg',
      icon_active: 'assets/images/home/footer/transitions-active.svg',
      active: 0,
      route: 'pages/dashboard/transitions',
    },
    {
      id: 5,
      label: 'User',
      icon: 'assets/images/home/footer/user.svg',
      icon_active: 'assets/images/home/footer/user-active.svg',
      active: 0,
      route: 'pages/dashboard/user',
    },
  ];

  @Output() activeIndex: EventEmitter<any> = new EventEmitter<any>();
  constructor(public users: UserService) {}

  async ngOnInit() {
    console.log("in home switcher")
    console.log("dashboard",await this.users.getUserRoleId());


  }

  makeActive(item) {
    this.menulist = ((this.users.role_id === 3) ? this.menulistVendor : this.menulistUser).map((x) => {
      x.active = x.id == item.id ? 1 : 0;
      return x;
    }) as any[];
    console.log({item})
    this.activeIndex.emit(item);
  }
}
