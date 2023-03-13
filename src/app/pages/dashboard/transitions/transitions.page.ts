import { Component, OnInit, Injector, Input } from '@angular/core';
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
    for (let i = 0; i < res.length; i++) {
      const amount = Number(res[i].amount);
      this.totalAmount = this.totalAmount+amount
      console.log(this.totalAmount);
    }
    this.list = res;
    this.loading = false;
  }

}
