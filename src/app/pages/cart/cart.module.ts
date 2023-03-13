import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { ShippingAddressFormComponent } from './shipping-address-form/shipping-address-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { SwiperModule } from 'swiper/angular';
import { CcCartSlideComponent } from './cc-cart-slide/cc-cart-slide.component';
import { CcCheckoutSlideComponent } from './cc-checkout-slide/cc-checkout-slide.component';
import { CcPaymentSlideComponent } from './cc-payment-slide/cc-payment-slide.component';
import { CcResultSlideComponent } from './cc-result-slide/cc-result-slide.component';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { MenuListItemsModule } from 'src/app/components/menu-list-items/menu-list-items.module';
import { CartItemComponent } from './cart-list-item/cart-item/cart-item.component';
import { HomeSwitcherModule } from '../dashboard/components/home-switcher/home-switcher.module';
import { BrowserModule } from '@angular/platform-browser';
// import { HomeSwitcherComponent } from '../dashboard/components/home-switcher/home-switcher.component';
// import { MenuListItemsModule } from 'src/app/components/menu-list-items/menu-list-items.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CartPageRoutingModule,
    SwiperModule,
    MenuListItemsModule,
    HomeSwitcherModule,
    IconInputBoxModule,
    BrowserModule
    // HomeSwitcherComponent
  ],
  declarations: [
    CartPage,
    CcCartSlideComponent,
    CcCheckoutSlideComponent,
    CcPaymentSlideComponent,
    CcResultSlideComponent,
    CartListItemComponent,
    CartItemComponent,
    ShippingAddressFormComponent
  ],
})
export class CartPageModule {}
