import { Config } from './../../config/main.config';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-item-box-ph',
  templateUrl: './item-box-ph.component.html',
  styleUrls: ['./item-box-ph.component.scss'],
})
export class ItemBoxPhComponent implements OnInit {
  @Input() item;
  images: any[]=[];
  url;
  image_url;
  usertype;
  constructor(public users: UserService) {}

  ngOnInit() {
    // this.role_id = localStorage.getItem('role_id');
    this.url = Config.URL;
    this.images = this.item?.park_images;
    if(this.images.length > 0){
      this.image_url = this.url + this.images[0]?.image_url;
    }


  }

}
