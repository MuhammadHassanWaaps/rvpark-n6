import { BasePage } from 'src/app/pages/base-page/base-page';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-cclist',
  templateUrl: './cclist.component.html',
  styleUrls: ['./cclist.component.scss'],
})
export class CclistComponent extends BasePage implements OnInit {
  cities: any[] = [];
  searchTerm: any = '';
  @Input() state: any;
  page = 1;
  last_page = -1;

  constructor(injector: Injector, public data: DataService) {
    super(injector);

    this.page = 1;

  }

  ngOnInit() {
    console.log(this.state);
    this.initialize();
  }

  async initialize() {
    this.page = 1;
    let obj = { 
      state: this.state.id,
      page: this.page,
      search: this.searchTerm
    }

    let data = await this.data.getCities(obj) as any;

    this.last_page = data.last_page;
    this.cities = data.data;
    // console.log('citiest', this.cities);

    // let test = this.cities.filter(x => x === this.city);
    // console.log(this.cities);
    // console.log(test);
  }

  selectCity(item: any) {
    this.modals.dismiss({ data: item });
  }

  async onIonInfinite(ev){
    this.page = this.page + 1;
    if(this.page > this.last_page ){
      (ev as InfiniteScrollCustomEvent).target.complete();
      return;
    }

    let obj = {
      state: this.state.id,
      page: this.page,
      search: this.searchTerm
    }

    let data = await this.data.getCities(obj) as [];

    if(data['data'].length > 0){
      this.cities = this.cities.concat(data['data']);
    }

    
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  search($event){        
    this.initialize();
  }
}
