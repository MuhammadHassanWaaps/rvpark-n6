import { Component, Input, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
// import {} from "../../../assets/images/tocos/menu"

@Component({
  selector: 'app-menu-list-items',
  templateUrl: './menu-list-items.component.html',
  styleUrls: ['./menu-list-items.component.scss'],
})
export class MenuListItemsComponent implements OnInit {
  @Input() list: any[] = [];

  constructor(private nav: NavService) {}

  ngOnInit() {}
}
