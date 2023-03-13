import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config } from 'src/app/config/main.config';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {

  loading = true;
  private _item;
  @Input()
  public get item(): any {
    return this._item;
  }

  public set item(value: any){
    this._item = value;
    this.initialize(value)
  }

  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  url;
  selectedPlot;
  price;
  datePurchased;
  location;

  constructor() {}

  ngOnInit() {
    this.url = Config.URL;
  };

  initialize(value){

    console.log(value);
    this.loading = false;

  }

  getItemImage(item) {

    if(!item.park){
      return 'assets/images/fl1.png';
    }
    var images = item?.park.park_images;
    if(images.length > 0){
      const res = this.url + images[0]?.image_url;
      return res;
    } else {
      return 'assets/images/fl1.png';
    }

  }

  deleteItem(){
    this.delete.emit(this.item)
  }


}
