import { ShippingAddressFormComponent } from './../shipping-address-form/shipping-address-form.component';
import { CartService } from 'src/app/services/cart.service';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-cc-checkout-slide',
  templateUrl: './cc-checkout-slide.component.html',
  styleUrls: ['./cc-checkout-slide.component.scss'],
})
export class CcCheckoutSlideComponent extends BasePage implements OnInit {
  @Output('toCheckout') toCheckout: EventEmitter<any> = new EventEmitter<any>();
  @Output('toOut') toOut: EventEmitter<any> = new EventEmitter<any>();
  allData: any;
  userDetails: any;
  shippingAddress: any;
  paymentMethod: any;
  totalPrice: any;
  obje: any[] = [];
  item = {
    id: 1,
  };

  constructor(injector: Injector, public cartServ: CartService) {
    super(injector);
    //this.allData = this.dataService.getCheckOutDetail();
    // this.shippingAddress = this.allData[0];
    // this.paymentMethod = this.allData[1];
    // this.totalPrice = this.allData[2];



    // check which list has this item

    this.obje = this.dataService.getTacos();
    // const id = this.item.id;
    // if (id < 5) {
    //   this.obje = this.obje.splice(0, 1);
    // } else {
    //   this.obje = this.obje.splice(1, 1);
    // }



  }

  ngOnInit() {
    this.initialize()
  }

  async initialize(){
    this.shippingAddress = await this.network.getShippingAddress();
    console.log(this.shippingAddress);
  }

  openCheckout() {
    this.toCheckout.emit();
  }
  closeModal() {
    this.toOut.emit();
  }

  async addEditShippingAddress(){

    const res = await this.modals.present(ShippingAddressFormComponent);
    console.log(res);
    this.shippingAddress = await this.network.getShippingAddress();



  }
}
