import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cc-cart-slide',
  templateUrl: './cc-cart-slide.component.html',
  styleUrls: ['./cc-cart-slide.component.scss'],
})
export class CcCartSlideComponent implements OnInit {
  @Output('toCheckout') toCheckout: EventEmitter<any> = new EventEmitter<any>();
  @Output('toOut') toOut: EventEmitter<any> = new EventEmitter<any>();
// total_price;
  constructor(public cartServ: CartService) {}

  ngOnInit() {
    
    console.log(this.cartServ);
    // this.total_price = this.cartServ.cart.cart_items[0].daily_total_price;
    // console.log("total_price",this.total_price);

  }

  openCheckout() {
    this.toCheckout.emit();
  }

  closeModal() {
    this.toOut.emit();
  }

  async getCartTotal(){
    const res = await this.cartServ.getCartTotal();
    console.log("cart",res);
  }


}
