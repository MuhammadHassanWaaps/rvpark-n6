import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent extends BasePage implements OnInit {
  orderitems : any[] = [];
  constructor(injector: Injector) {
    super(injector)
   }

  ngOnInit() {
    this.getOrders();
  }
  back(){
    this.modals.dismiss();
  }
  async getOrders(){
    await this.network.getOrders().then((res)=> {
      console.log(res);
      this.orderitems = res
    })
  }

  startDate(date)
  {
    const response = date.split('' , 10).join('');
    return response;
  }

  endDate(date)
  {
    const response = date.split('' , 10).join('');
    return response;
  }
}
