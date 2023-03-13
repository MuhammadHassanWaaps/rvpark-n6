import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ModalService } from 'src/app/services/basic/modal.service';
import { SwiperComponent } from 'swiper/angular';
import { HomeSwitcherComponent } from '../dashboard/components/home-switcher/home-switcher.component';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, AfterViewInit {

  @Input() selectedPackageId;
  @Input() item;
  @ViewChild('swiper', { static: false }) swiper?: IonSlides;

  loading = true;
  constructor(public modals: ModalService, public cartServ: CartService, public users: UserService) {}

  ngAfterViewInit(): void {
    this.swiper?.lockSwipes(true);
  }

  ngOnInit() {
    console.log("cart initialized");
    this.initialize();
  }

  async initialize(){
    this.loading = true;
    const res = await this.cartServ.fetchCart();
    console.log(res);
    this.loading = false;
  }

  toCheckout(index) {
    if (index < 2) {

      let userId = this.users.user.id;
      let url = `https://kjrvportal.com/payment?amount=${this.cartServ.net_total}&user_id=${userId}&card_id=${this.cartServ.cart.id}`;
      window.open(url, '_blank')



      this.swiper?.lockSwipes(false);
      this.swiper?.slideTo(index);
      this.swiper?.lockSwipes(true);
      






    } else {
      this.modals.dismiss({
        timestamp: Date.now(),
      });
    }
  }

  toOut(num) {
    if (num == 1) {
      this.modals.dismiss({
        timestamp: Date.now(),
      });
    } else {
      this.swiper?.lockSwipes(false);
      this.swiper?.slidePrev();
      this.swiper?.lockSwipes(true);
    }
  }
}
