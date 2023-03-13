import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-pre-splash',
  templateUrl: './pre-splash.page.html',
  styleUrls: ['./pre-splash.page.scss'],
})
export class PreSplashPage extends BasePage implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {

    setTimeout(() => {
      this.nav.push('pages/splash')
    }, 2000);

  }

}
