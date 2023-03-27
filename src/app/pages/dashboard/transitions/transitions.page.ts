import { Component, OnInit, Injector, Input } from '@angular/core';
import * as _ from 'underscore';
import { BasePage } from '../../base-page/base-page';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

@Component({
  selector: 'app-transitions',
  templateUrl: './transitions.page.html',
  styleUrls: ['./transitions.page.scss'],
})
export class TransitionsPage extends BasePage implements OnInit {

  @Input() type = 'transactions';
  loading = false;
  totalAmount = 0;
  isModal = false;
  list: any[] = [];
  constructor(injector: Injector) {
    super(injector);
    this.initialize()
  }

  closeModal() {

    if(this.isModal){
      this.modals.dismiss();
    }


  }


  async ngOnInit() {
    console.log();

    // let transactions = await this.users.getMyOrders();
    // console.log("transactions",transactions)
  }

  cancel(){
    this.modals.dismiss();

    //vendor
    //get-my-payment-history

    //user
//get-my-orders
  }
  details(data){
    console.log("this is item",data);

    this.modals.present(TransactionDetailsComponent,{data: data})
  }

  async initialize(){
    this.loading = true;
    const res = await this.network.getMyTransactions();
    console.log(res);


    this.list = res.map((parent) => {

      parent['order_detail']

      let sor = _.sortBy(parent['order_detail']['order_items'], 'available_start_date')

      const list45 = _.groupBy(sor, 'spot_id');

      let array13815: any[] = [];
      for (const [key, value] of Object.entries(list45)) {
        console.log(`${key}: ${value}`);

        console.log(value[0]);
        let f = value[0] as any;

        let red = value.reduce((prev, curr) => {
          return prev + parseInt(curr['price'])
        }, 0);


        f['price'] = red;

        f['available_start_date'] = value[0]['available_start_date'];
        f['available_end_date'] = value[value.length - 1]['available_end_date'];
        console.log(value[value.length - 1]['available_end_date']);
        array13815.push(f);

      }

      console.log(array13815)
      parent['order_detail']['order_items'] = array13815;



      return parent;
    })

    this.totalAmount = this.list.reduce( (prev, next) => {
      return prev + parseInt(next.payment_recieved)
    }, 0);


    // for (let i = 0; i < res.length; i++) {
    //   const amount = Number(res[i].amount);
    //   this.totalAmount = this.totalAmount+amount
    //   console.log(this.totalAmount);
    // }
    // this.list = res;
    this.loading = false;
  }

  openDetails(item){

  }

}
