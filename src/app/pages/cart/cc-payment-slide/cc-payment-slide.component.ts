import { CartService } from 'src/app/services/cart.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { NetworkService } from 'src/app/services/network.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-cc-payment-slide',
  templateUrl: './cc-payment-slide.component.html',
  styleUrls: ['./cc-payment-slide.component.scss'],
})
export class CcPaymentSlideComponent implements OnInit {
  @Output('toCheckout') toCheckout: EventEmitter<any> = new EventEmitter<any>();
  @Output('toOut') toOut: EventEmitter<any> = new EventEmitter<any>();
  activePaymentOption = 2;
  name_on_card:any;
  card_num:any;
  expire:any;
  cvv:any;
  
  card:any = {
    number: '4242424242424242',
    expMonth: '03',
    expYear: 2023,
    cvc: '123'
  };

  loading = false;
  strip:any= {}





  constructor(public cartServ: CartService, private stripe: Stripe, public network: NetworkService, public utility: UtilityService) { 
    this.initialize();
  }

  ngOnInit() { }

  async initialize(){
    this.network.getStripePublicKey().then((res)=> {
      console.log(res);
      this.strip.publicKey = res.value
    })
  }
  async openCheckout() {

    // call network to place order
    const res = await this.cartServ.addOrderByCart();

    this.toCheckout.emit();
  }
  closeModal() {
    this.toOut.emit();
  }

  checkCardWIthStripe() {

    this.loading = true;
    if(Capacitor.getPlatform() == 'web'){



      setTimeout( () => {
        this.openCheckout();
        this.loading = false;
      }, 2000);
      
      return;

    }

    this.stripe.setPublishableKey(this.strip.publicKey);


    // console.log(!this.name_on_card || !this.card_num || !this.expire || this.cvv, this.name_on_card, this.card_num, this.expire, this.cvv)
    // if(!this.name_on_card || !this.card_num || !this.expire || this.cvv){
    //   this.utility.presentFailureToast("Please fill card details")
    //   return;
    // }

    this.stripe.createCardToken(this.card)
   .then(token => {
    console.log(token.id)
    this.openCheckout()
   })
   .catch(error => { 
      console.error(error) 
      this.utility.presentFailureToast("Card info error")
    });

    // this.stripe.createCardToken(this.card)
    //   .then(token => console.log(token.id))
    //   .catch(error => console.error(error));
  }

}
