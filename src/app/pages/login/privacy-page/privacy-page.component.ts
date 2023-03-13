import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss'],
})
export class PrivacyPageComponent extends BasePage implements OnInit {
  agreePrivacyPolicy = false;
  constructor(injector: Injector) {
    super(injector)
   }

  ngOnInit() {}
  agree(){
    this.agreePrivacyPolicy = true;
    this.modals.dismiss({agreePrivacyPolicy : this.agreePrivacyPolicy});
  }

}
