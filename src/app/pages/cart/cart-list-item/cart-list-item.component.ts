import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss'],
})
export class CartListItemComponent implements OnInit {

  list = [];
  constructor(private cartServ: CartService) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.list = await this.cartServ.getCartItems() as [];
  }

  async deleteItem(item){
    await this.cartServ.deleteCartItem(item.id)
    this.initialize();
  }
}
