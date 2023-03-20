import { ChatPageModule } from './../dashboard/chat/chat.module';
import { ChatListComponent } from './../dashboard/chat/chat-list/chat-list.component';

import { AddRvPage } from './../dashboard/add-rv/add-rv.page';
import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Config } from './../../config/main.config';
import { emit } from 'process';
import { DataService } from 'src/app/services/data.service';
import { BasePage } from '../base-page/base-page';
import { CartPage } from '../cart/cart.page';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { PackagesPage } from '../dashboard/packages/packages.page';
import { ChatBoxComponent } from '../dashboard/chat/chat-box/chat-box.component';
import { ChatPage } from '../dashboard/chat/chat.page';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.page.html',
  styleUrls: ['./menu-details.page.scss'],
  styles: [
    `
      .green {
        color: white;
        background-color: green;
      }
    `,
    `
      .white {
        color: green;
        background-color: #f6f5f5;
      }
    `,
  ],
})
export class MenuDetailsPage extends BasePage implements OnInit {

  loading = true;
  price;
  url;
  park_images;
  park_spots;
  currentUser;
  // role_id: any;
  park;
  selectedPackageId: any[] = [];
  park_id;
  data: any;
  balls = [
    {
      name: '1A',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '1B',
      color: 'green',
      bg_color: '#F6F5F5',
    },
    {
      name: '1C',
      color: 'white',
      bg_color: '#F6F5F5',
    },
    {
      name: '1D',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '2A',
      color: 'green',
      bg_color: '#F6F5F5',
    },
    {
      name: '2B',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '2C',
      color: 'green',
      bg_color: '#F6F5F5',
    },
    {
      name: '2D',
      color: 'green',
      bg_color: '#F6F5F5',
    },
    {
      name: '3A',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '3B',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '3C',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '3D',
      color: 'green',
      bg_color: '#F6F5F5',
    },
    {
      name: '4A',
      color: 'green',
      bg_color: '#F6F5F5',
    },
    {
      name: '4B',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '4C',
      color: 'white',
      bg_color: 'green',
    },
    {
      name: '4D',
      color: 'white',
      bg_color: 'green',
    },
  ];
  @Output() EmitMenu = new EventEmitter<string>();

  selectedDate;

  constructor(injector: Injector) {
    super(injector);
    // const dataService = new DataService();
    // this.allData = dataService.getMenuDetail();
    // this.main_title = this.allData[0];
    // this.menu_details = this.allData[1];
    // console.log(this.menu_details);

    const params = this.nav.getQueryParams();
    console.log('this is data', params);

    if (params) {
      let id = JSON.parse(params['item_id']);
      this.park_id = id;

      const string: any = localStorage.getItem('user');
      let user = JSON.parse(string);
      this.currentUser = user;
      console.log("Current User : ", this.currentUser);

      if(!id){
        this.nav.pop();
        return;
      }

      this.initialize(id);


    } else {
      this.nav.pop();
      return;
    }

  }

  ngOnInit() {
    this.url = Config.URL;
  }

  async initialize(id){

    const res = await this.network.getUserRoleId();
    // this.role_id = Number(res);
    console.log("role_id",res);

    this.loading = true;
    this.network.getSpotDetail({id: id}).then((res) => {
      console.log('getDetail', res);
      this.data = res;

      // this.price = 0;
      // if(this.data.park_sopts.length > 0){
      //   this.price = this.data.park_sopts[0]?.spot_price;
      // }

      // this.price = this.data.park_sopts[0]?.spot_price;
      this.loading = false;
      // console.log('this is park images', this.park_images);
      // this.park_spots = this.item.park_spots;
      // console.log('this is spots', this.park_spots);
      // this.url = Config.URL;


    }, err => {
      this.nav.pop();
      return;
    });

  }

  back() {
    this.nav.pop();
  }

  // menu();

  addToCart() {
    // this.nav.push('pages/cart');
    this.modals.present(CartPage);
  }

  async toggleDate() {
    console.log(this.data.park_sopts);
    var avsp:any[] = [];

    let avs = this.data.park_sopts.map( x => {
      return x.available_date ? x.available_date : [];
    });

    avs.forEach(element => {
      element.forEach((et: any) => {
        avsp.push(et);
      });
    });

    console.log(avsp);

    // const res = await this.modals.present(DatePickerComponent, 'transparent-modal');
    // console.log(res);
    // if(res && res.data){
    //   this.selectedDate = res.data.date[0];
    // }
    // console.log(this.selectedDate);
  }
  gotoAddRv(peram = null){
    // set this item in local
    localStorage.setItem('park', JSON.stringify(this.data));
    this.nav.push('pages/dashboard/add-rv', {park_id: this.data.id})
  }

  async checkMyItemSelected(item, aitem){



    let findIndex = this.selectedPackageId.findIndex(x => x == aitem.id)
    if(findIndex != -1) {
      this.selectedPackageId = this.selectedPackageId.filter((value)=>value!=aitem.id);
    } else {
      this.selectedPackageId.push(aitem.id);

      let obj = {
        // "park_id": this.data.id,
        // "spot_id": aitem.spot_id,
        // "available_date" : aitem.available_spot_date
        "spot_available_date_id": aitem.id,
        "package": ""+item.available_date[0].selected_package
      }

      console.log(obj);

      const res = await this.network.addToCart(obj);
      console.log(res);
      this.utility.presentSuccessToast("Item added to cart");

    }


  }

  selectedCategory(item) {
    console.log(item)
  }


  isItemSelected(id){
    let findIndex = this.selectedPackageId.findIndex(x => x == id);
    return findIndex != -1;
  }

  async deletePark(){
    const res = await this.network.deletePark({
      park_id: this.park_id,
    });
    this.nav.pop();

  }


  async gotoBuySpot() {

    console.log("selectedPackageId",this.selectedPackageId);

    let spot:any = null;
    for( var i = 0; i < this.data.park_sopts.length; i++){
      for(var j = 0; j < this.data.park_sopts[i]['available_date'].length; j++){
        console.log(this.data.park_sopts[i]['available_date'][j].id, this.selectedPackageId);
        if(this.data.park_sopts[i]['available_date'][j].id == this.selectedPackageId){
          spot = this.data.park_sopts[i]['available_date'][j];
        }
      }

    }

    let obj = {
      "park_id": this.data.id,
      "spot_id": spot.spot_id,
      "available_date" : spot.available_spot_date
    }

    console.log(obj);

    const res = await this.network.addToCart(obj);
    console.log(res);
    this.utility.presentSuccessToast("Item added to cart");
    this.modals.present(CartPage);


  }

  getItemImage(image){

    if(image){
      const res = this.url + image?.image_url;
      return res;
    } else {
      return 'assets/images/fl1.png';
    }

  }


  returnParseInt(v){
    return parseInt(v, 10)
  }


  goToEditPark(peram = null){
    console.log("this.data",this.data);

    this.modals.present(AddRvPage, {
      isEdit: true,
      park: this.data
    })
  }
  gotoSelectSpot(item, aitem){
    this.nav.push('pages/menu-details/select-spot',{
      item: JSON.stringify(item),
      aitem: JSON.stringify(aitem)
    });
  }
  async changeSpot(param,item){
    console.log(param.target.value);

    let data = {
      spot_id : item.id,
      availability : param.target.value
    }
    this.network.changeSpotAvailablility(data).then((res)=>{
      console.log(res);

    })
  }

  openChat() {
    console.log("go to Home")

    if(this.currentUser.id == this.data.user_id){
      // this.nav.push('pages/dashboard/chat',{park_id:this.park_id});
      this.modals.present(ChatPage,{park_id:this.park_id} );
    } else {
      this.modals.present(ChatBoxComponent,{park_id:this.park_id, data: this.data})
    }



  }
}
