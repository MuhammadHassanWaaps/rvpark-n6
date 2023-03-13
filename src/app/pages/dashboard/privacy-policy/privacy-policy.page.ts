import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { NavService } from 'src/app/services/basic/nav.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  
  usertype: any = 'user';
  constructor(private nav: NavService) { }

  ngOnInit() {
    this.usertype = localStorage.getItem('usertype');
  }

  ionViewWillEnter (){
    this.usertype = localStorage.getItem('usertype');
  }

  back(){
    this.nav.pop();
  }
}

