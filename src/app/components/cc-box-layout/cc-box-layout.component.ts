import { NavService } from 'src/app/services/basic/nav.service';
import { NetworkService } from 'src/app/services/network.service';
import {
  Component,
  Injector,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { DataService } from 'src/app/services/data.service';
import { Config } from 'src/app/config/main.config';

@Component({
  selector: 'app-cc-box-layout',
  templateUrl: './cc-box-layout.component.html',
  styleUrls: ['./cc-box-layout.component.scss'],
})
export class CcBoxLayoutComponent implements OnInit {
  @Input('heading') heading = '';
  @Input('list') list:any[] = [];







  @Output('selection') selection: EventEmitter<any> = new EventEmitter<any>();
  url;
  constructor(public network: NetworkService, public nav: NavService) {}

  ngOnInit() {
    this.url = Config.URL;
  }

  menuDetails(item) {

    let id = item.id;
    this.nav.push('pages/menu-details', { item_id: id });

    this.selection.emit(item);
  }

  getItemImage(item) {

    var images = item?.park_images;
    if(images.length > 0){
      const res = this.url + images[0]?.image_url;
      return res;
    } else {
      return 'assets/images/fl1.png';
    }

  }
}
