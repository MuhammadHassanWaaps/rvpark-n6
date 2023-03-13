import { Component, Input, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
import { DataService } from 'src/app/services/data.service';

// import { Component, Injector, OnInit } from '@angular/core';
// import { DataService } from 'src/app/services/data.service';
import { BasePage } from '../../base-page/base-page';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage extends BasePage implements OnInit {

  obje7986: any[] = [];
  filteredData: any[] = [];
  loading = false;
  filters = {
    city_name: ''
  }


  constructor(injector: Injector) {
    super(injector);
    this.getParks();

    this.events.subscribe('location_changed', (params) => {
      console.log(params);
      this.filters.city_name = params['city_name'];
      this.getParks();
    });

  }

  ngOnInit() {
    console.log('this is obj');
  }

  ionViewWillEnter(){
    let params = this.nav.getQueryParams();
    console.log(params);
    if(params['city_name']){
      this.filters.city_name = params['city_name'];
      this.getParks();
    }
    
  }

  openSelection($event) {
    console.log($event);
    this.nav.push('pages/menu-details', { item: JSON.stringify($event) });
  }

  async getParks(){
    this.loading = true;
    const res = await this.network.getSpotlist(this.filters);
    this.obje7986 = res;
    this.filteredData = res;
    console.log(res);
    this.loading = false;
    

  }

  async filterSearch($event){
    let v = $event.target.value;
    let searchResuslts = await this.network.searchPark({search:v});
    this.filteredData = searchResuslts;
    console.log(searchResuslts);
    
  }
}

