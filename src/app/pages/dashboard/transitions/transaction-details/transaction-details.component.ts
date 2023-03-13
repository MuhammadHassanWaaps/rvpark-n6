import { Component, inject, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent extends BasePage implements OnInit {

  @Input() data;
  fee = 0
  net_total = 0
  OrderDetails = {
    cart_id: "2",
    commission: null,
    created_at: "2023-01-16T20:38:17.000000Z",
    id: 2,
    order_confirmed: "1",
    user_id: "27",
    total_amount: "753",
    updated_at: "2023-01-16T20:38:17.000000Z",
    order_items: [{
      available_date: "2023-01-06 00:00:00",
      cart_id: "2",
      created_at: "2023-01-16T20:38:17.000000Z",
      id: 2,
      park: {
        address: "some address",
        city: "Los Angeles",
        country: "USA",
        created_at: "2023-01-27T16:37:46.000000Z",
        description: "asdasdasdsadsd",
        id: 2,
        name: "north avenu",
        province: "California",
        updated_at: "2023-01-27T16:37:46.000000Z",
        user_id: "28"
      },
      park_id: "113",
      price: "753",
      spot_address: "washington",
      spot_id: "138",
      updated_at: "2023-01-16T20:38:17.000000Z"
    }],
    user: {
      avatar: "users/default.png",
      created_at: "2023-01-16T13:27:16.000000Z",
      deleted_at: null,
      email: "anas.ahmed142@gmail.com",
      email_verified_at: null,
      id: 27,
      name: "Anas Ahmed",
      profile: {
        card_no: null,
        city: "Hammond",
        country: "USA",
        created_at: "2023-01-16T13:27:16.000000Z",
        cvv: null,
        expire: null,
        id: 34,
        name_on_card: null,
        province: "Indiana",
        street_address: "AA",
        updated_at: "2023-01-27T10:33:04.000000Z",
        user_id: "27"
      },
      // role_id: "2",
      settings: [],
      updated_at: "2023-01-17T14:20:49.000000Z"
    }
  };

  constructor(injector: Injector) {
    super(injector)
  }

  async ngOnInit() {
    console.log("thisdasd", this.data.order_id);
    let details = await this.network.getOrderDetails(this.data.order_id)
    this.OrderDetails = details
    this.fee = Math.round(Number(details?.total_amount) * 0.1);
    this.net_total = Number(details?.total_amount) + this.fee;
    console.log(details);
  }

  closeModal() {
    this.modals.dismiss();
  }

  getItemImage() {

  }

}
