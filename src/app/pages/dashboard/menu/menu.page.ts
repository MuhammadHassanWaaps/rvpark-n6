import { Component, Injector, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage extends BasePage implements OnInit {
  obje: any[] = [];
  constructor(injector: Injector) {
    super(injector);
    
    this.obje = this.dataService.getTacos();
  }

  ngOnInit() {}

  openSelection($event) {
    console.log($event);
    this.nav.push('pages/menu-details', { item: JSON.stringify($event) });
  }
}
