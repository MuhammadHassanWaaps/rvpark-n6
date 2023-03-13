import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage extends BasePage implements OnInit {
  bgLoaded = false;
  showLogo = false;
  showLogButtons = false;
  fullbackground;
  long_logo;
  shade;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.initialize();
  }

  async initialize() {
    const res = await this.dataService.getSplashImages();
    this.fullbackground = res.image;
    this.long_logo = res.long_logo;
    this.shade = res.shade;

    // setTimeout(() => {
    //   this.showLogButtons = true;
    // }, 1000);

    let remember_me = localStorage.getItem( 'remember_me');
    if(remember_me && remember_me == 'false'){
      this.navigate('login')
      return;
    }



    let isAuthenticated = await this.users.getIsAuthenticated();
    if (isAuthenticated) {

      this.users.getUserData().then( v => {
        this.navigate('dashboard');
        this.menuCtrl.enable(true, 'main');
      }, err => {
        console.log(err)
        this.navigate('login')
      }).catch( err => {
        console.log(err)
        this.navigate('login')
      });

    } else {
      console.log('Navigating to login');
      this.navigate('login');
    }
      // } else this.navigate('login');




    /*
    setTimeout(() => {
      this.showLogo = true;
      // this.nav.push('pages/login');

    }, 1000);
    */
  }

  navigate(page, n = 10) {
    this.nav.push(`pages/${page}`, { num: n });
  }

  updateBackgroundView() {
    this.bgLoaded = true;
  }
}
