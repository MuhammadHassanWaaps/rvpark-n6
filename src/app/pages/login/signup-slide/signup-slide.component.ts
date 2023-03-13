import { SclistComponent } from 'src/app/components/sclist/sclist.component';
import { SignupSlide2Component } from './../signup-slide2/signup-slide2.component';
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';
import { CclistComponent } from 'src/app/components/cclist/cclist.component';
import { PrivacyPageComponent } from '../privacy-page/privacy-page.component';
import * as moment from 'moment';
@Component({
  selector: 'app-signup-slide',
  templateUrl: './signup-slide.component.html',
  styleUrls: ['./signup-slide.component.scss'],
})
export class SignupSlideComponent extends BasePage implements OnInit {
  @Output() gotoLogin: EventEmitter<any> = new EventEmitter<any>();

  aForm!: FormGroup;
  bForm!: FormGroup;
  cForm!: FormGroup;
  cities = [];
  states = [];
  selectedState: any;
  agreePrivacyPolicy: any;
  getYearDiff: any;
  enableDateOfBirth = false;
  @Input() step = 1;
  // isShow = false;
  constructor(injector: Injector) {
    super(injector);
    this.step = 1;
  }

  ngOnInit() {
    this.step = 1;
    this.initialize();
  }

  ionViewWillEnter() {
    this.step = 1;
  }

  inputChange($event, type) {
    console.log($event, type);
    if (this.step == 1) {
      this.aForm.controls[type].setValue($event);


      if(type == 'phone_number'){

        const format = this.utility.onkeyupFormatPhoneNumberRuntime($event, true);
        this.aForm.controls[type].setValue(format);


      }






    }

    if (this.step == 2) {
      this.bForm.controls[type].setValue($event);
    }

    if (this.step == 3) {
      this.cForm.controls[type].setValue($event);
    }
  }
  async initialize() {
    this.setupForm();
    this.setupForm2();
    this.setupForm3();
  }

  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      option: [
        'user', //test@test.com
        Validators.compose([Validators.required]),
      ],

      name: [
        '', //test@test.com
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],

      email: [
        '', //test@test.com
        Validators.compose([Validators.required,Validators.pattern(re)]),
      ],
      password: [
        '', // 12345678
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$'),
          Validators.required,
        ]),
      ],
      phone_number: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required, Validators.min(18)])], 
    });
  }
  setupForm2() {
    // const re = /\S+@\S+\.\S+/;

    this.bForm = this.formBuilder.group({
      street_address: [
        '', //test@test.com
        Validators.compose([Validators.required]),
      ],
      city: [
        '', // 12345678
        Validators.compose([Validators.required]),
      ],
      province: [
        '', // 12345678
        Validators.compose([Validators.required]),
      ],
      country: [
        'USA', //test@test.com
        Validators.compose([Validators.required]),
      ],
    });
    console.log(this.bForm.value);
  }
  setupForm3() {
    // const re = /\S+@\S+\.\S+/;

    let date = new Date();
    let month = date.getMonth() + 2;
    let year = date.getFullYear();

    this.cForm = this.formBuilder.group({
      card_no: [
        '4242424242424242', // 12345678
        Validators.compose([Validators.required]),
      ],
      expire_month: [
        month, //test@test.com
        Validators.compose([Validators.required]),
      ],
      expire_year: [
        year, //test@test.com
        Validators.compose([Validators.required]),
      ],
      cvc: [
        '314', //test@test.com
        Validators.compose([Validators.required]),
      ],
    });
    console.log(this.cForm.value);
  }

  gotoLoginEvent() {
    console.log('clicked');
    this.gotoLogin.emit({ timestamp: Date.now() });
  }
  async verifyCard() {
    if (this.cForm.invalid) {
      const err = this.formErrors.getFirstFormError(this.cForm);
      this.utility.presentFailureToast(err);
      return;
    }

    this.network.registerCard(this.cForm.value).then(
      (res) => {
        // if(this.aForm.controls['option'].value == 'renter'){
        // this.step = 2;

        // }
        // else{
        this.step = 1;
        this.utility.presentSuccessToast('Card Verified');
        this.nav.push('pages/dashboard');
        // }
      },
      (err) => {}
    );
    // console.log('signup api', data.data.token);

    // this.isShow = !this.isShow;
    // let token = JSON.stringify(data);
    // resolve(token);
    // console.log(set);
  }

  ///
  async gotoNext() {
    if (this.bForm.invalid) {
      const err = this.formErrors.getFirstFormError(this.bForm);
      this.utility.presentFailureToast(err);
      return;
    }

    this.users.updateRenterProfileOne(this.bForm.value).then(
      async (res) => {
        // this.nav.push('pages/dashboard')
        if (res) {
          const res = await this.network.getUserRoleId();
          if (res == 3) {
            this.nav.push('pages/dashboard');
          } else {
            this.step = 1;
            this.nav.push('pages/dashboard');
          }
        }
      },
      (err) => {}
    );
    // console.log('signup api', data.data.token);

    // this.isShow = !this.isShow;
    // let token = JSON.stringify(data);
    // resolve(token);
    // console.log(set);
  }

  //

  async signupPartOne() {
    if (this.aForm.invalid) {
      const err = this.formErrors.getFirstFormError(this.aForm);
      this.utility.presentFailureToast(err);
      return;
    }
``
    this.users.register(this.aForm.value).then(
      (res) => {
        if (res) {
          // this.nav.push('pages/dashboard')
          this.step = 2;
        }
      },
      (err) => {}
    );
    // console.log('signup api', data.data.token);

    // this.isShow = !this.isShow;
    // let token = JSON.stringify(data);
    // resolve(token);
    // console.log(set);
  }

  async gotoDashboard() {
    if (this.cForm.invalid) {
      const err = this.formErrors.getFirstFormError(this.cForm);
      this.utility.presentFailureToast(err);
      return;
    }

    this.users.updateRenterProfileTwo(this.cForm.value).then(
      (res) => {
        if (res) {
          this.nav.push('pages/dashboard');
        }
      },
      (err) => {}
    );
    // console.log('signup api', data.data.token);

    // this.isShow = !this.isShow;
    // let token = JSON.stringify(data);
    // resolve(token);
    // console.log(set);
  }
  async openStates() {
    const res = await this.modals.present(SclistComponent, {
      tag: 'States', 
    });

    
    console.log('asd', res.data.data);
    if (res.data && res.data.data) {
      this.selectedState = res.data.data;
      console.log(this.selectedState)

      this.bForm.controls['province'].setValue(res.data.data.name);
    }
  }
  async openCities() {
    if (this.bForm.controls['province'].invalid) {
      return;
    }

    let v = this.bForm.controls['province'].value;

    const res = await this.modals.present(CclistComponent, {
      state: this.selectedState,
    });

    console.log('asd', res.data.data);
    if (res.data && res.data.data) {
      this.bForm.controls['city'].setValue(res.data.data.name);
    }
  }
  dateOfBirth($event){

    let v = $event.target.value;
    console.log(v);

    // this.getYearDiff = moment().diff($event.target.value, 'years');
    // if(this.getYearDiff > 18) {
    //   this.enableDateOfBirth = true
    //   console.log(this.getYearDiff);
    // }else if (this.getYearDiff < 18) {
    //   this.enableDateOfBirth = false;
    // }
  }
  async gotoprivacy() {
    let data = await this.modals.present(PrivacyPageComponent);
    this.agreePrivacyPolicy = data.data.agreePrivacyPolicy;
    console.log(this.agreePrivacyPolicy);
    
  }
}
