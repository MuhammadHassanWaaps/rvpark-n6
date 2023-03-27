import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';
import * as _ from 'underscore';
import { TransactionDetailsComponent } from '../../transitions/transaction-details/transaction-details.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent extends BasePage implements OnInit {
  orderitems: any[] = [];
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.getOrders();
  }
  back() {
    this.modals.dismiss();
  }
  async getOrders() {
    await this.network.getOrders().then((res) => {
      console.log(res);
      this.orderitems = res.map((parent) => {

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
    })
  }


  details(data){
    console.log("this is item",data);

    this.modals.present(TransactionDetailsComponent,{data: data})
  }



  startDate(date) {
    const response = date.split('', 10).join('');
    return response;
  }

  endDate(date) {
    const response = date.split('', 10).join('');
    return response;
  }
}
