import { NetworkService } from 'src/app/services/network.service';
import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: any;
  cartItems = [];
  total = 0;
  fee = 0;
  net_total = 0;
  loading = true;

  constructor(private network: NetworkService) { }

  fetchCart(){
    return new Promise( async resolve => {
      this.loading = true;
      const res = await this.network.getCart();
      console.log(res);

      if(!res['list']){
        resolve(null)
        return;
      }

      if(!res['list']['cart_items']){
        resolve(null)
        return
      }


      if(res['list']['cart_items']){
        // combine cart list items and their price

        let sor = _.sortBy(res['list']['cart_items'], 'available_start_date')

        const list45 = _.groupBy(sor, 'spot_id');
        console.log(list45);

        let array13815: any[] = [];
        for (const [key, value] of Object.entries(list45)) {
          console.log(`${key}: ${value}`);



          console.log(value[0]);
          let f = value[0] as any;

          let red = value.reduce( (prev, curr) => {
            return prev + parseInt(curr['price'])
          }, 0);


          f['price'] = red;

          f['available_start_date'] = value[0]['available_start_date'];
          f['available_end_date'] = value[value.length - 1]['available_end_date'];
          console.log(value[value.length - 1]['available_end_date']);






          array13815.push(f);

        }

        console.log(array13815)

        res['list']['cart_items'] = array13815;



      }
















      this.cart = res['list'];
      // this.fee = res['fee'];
      await this.getCartTotal();
      this.loading = false;
      resolve(true)
    })
  }

  getCartTotal(){
    return new Promise( resolve => {

      if(!this.cart){
        resolve(0);
        return;
      }

      if(!this.cart.cart_items){
        resolve(0);
        return;
      }

      this.cart.cart_items
      this.total = this.cart.cart_items.reduce( (prev, next) => {
        console.log();

        return prev + Math.round(next['price']);
      }, 0);

      console.log(this.total);

      this.fee = Math.round(this.total * 0.1);

      this.net_total = this.total + this.fee;
      resolve(this.total);

    })
  }

  getCartItems(){
    return new Promise( resolve => {
      if(!this.cart){
        resolve([]);
        return;
      }

      if(!this.cart.cart_items){
        resolve([]);
        return;
      }

      this.cartItems = this.cart.cart_items;
      resolve(this.cart.cart_items)

    })

  }

  deleteCartItem(id){
    return new Promise( async resolve => {

      this.cart.cart_items = this.cart.cart_items.filter( x => x.id != id);
      this.cartItems = this.cartItems.filter( x => x['id'] != id);

      const res = await this.network.deleteCartItem({cartitem_id: id});
      await this.getCartTotal();

      resolve(true);

    })
  }

  addOrderByCart(){
    return new Promise( async resolve => {

      const res = await this.network.addOrder({
        cart_id: this.cart.id
      });

      if(res){
        this.cart = null;
      }

      resolve(true);

    })
  }

  sendNotification(data){

    return new Promise( async resolve => {
      const res = await this.network.sendNotification(data);
      resolve(res);
    })
  }




}
