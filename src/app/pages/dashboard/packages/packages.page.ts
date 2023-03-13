import { Component, Injector, Input, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage extends BasePage implements OnInit{

  @Input() item
  @Input() aitem
  select1 = false;
  select2 = false;
  select3 = false;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    console.log("thi is saasda", this.item, this.aitem);
  }
  back(){
    this.modals.dismiss();
  }

  click1(){
    this.select1 = true;
    this.select2 = false;
    this.select3 = false;
  }
  click2(){
    this.select1 = false;
    this.select2 = true;
    this.select3 = false;
  }
  click3(){
    this.select1 = false;
    this.select2 = false;
    this.select3 = true;
  }
}
