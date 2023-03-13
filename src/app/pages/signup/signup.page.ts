import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Browser } from '@capacitor/browser';
import { PLAN_TYPE } from 'src/app/data/const/enums';
// import { PLAN_TYPE } from 'src/app/data/const/enums';
import { StringsService } from 'src/app/services/basic/strings.service';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage extends BasePage implements OnInit, AfterViewInit {
  signupObj = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    dob: '',
    gender: 'm',
    package_id: 1,
  };

  loading = false;

  aForm!: FormGroup;
  packages: any;

  constructor(injector: Injector) {
    super(injector);
    this.setupForm();
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required,
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      // phone: ['', Validators.compose([Validators.required])],
      password: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      password_confirmation: [
        '',
        Validators.compose([
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.packages = [
      {
        id: 1,
        name: 'Free - $0/Month',
      },
      {
        id: 2,
        name: 'Gold - $9.95/Month',
      },
      {
        id: 3,
        name: 'Platinum - $31.95/Month',
      },
    ];
  }

  async singUp() {
    // this.nav.navigateTo('home');
    if (this.aForm.invalid) {
      console.log(this.aForm.errors);
      this.utility.presentFailureToast('Please fill all fields properly');
      return;
    }

    const formdata = {
      ...this.aForm.value,
      package_id: PLAN_TYPE.FREE, // Always Free it will be updated with stripe payment page
      //  password_confirmation: this.aForm.value['password'],
    };

    console.log(formdata);

    // formdata['phone'] = '+1' + this.strings.getOnlyDigits(formdata['phone']);

    // console.log(formdata);

    this.loading = true;

    const res = await this.network.register(formdata);
    console.log(res);

    // console.log(data);

    if (res && res.data) {
      this.users.setToken(res.data.token);
      if (this.signupObj.package_id != PLAN_TYPE.FREE) {
        let _res = await this.network.getUser();
        console.log('User', _res);
        if (_res && _res.data && _res.data.user) {
          this.users.setUser(_res.data.user);
          console.log('Updating User');
          this.nav.push('pages/stripe-payment', {
            package_id: this.signupObj.package_id,
            shouldRedirect: true,
          });
        }
        // else
        //   this.utility.presentFailureToast(
        //     _res?.message ?? 'Something went wrong'
        //   );
      } else {
        this.nav.push('pages/home');
        this.menuCtrl.enable(true, 'main');
      }
    }
    // else
    //   this.utility.presentFailureToast(res?.message ?? 'Something went wrong');
    return;

    // if (data) {
    //   const res = await localStorage.setItem('token', data.token);
    //   if (res) {
    //     this.modals.dismiss({ data: res });
    //   }
    //   // await Browser.open({ url: `https://dev-veenme.thesupportonline.net/testtoken/${data.token}` });
    // }

    this.loading = false;

    this.utility.presentSuccessToast('Success');
    this.nav.navigateTo('home');
  }

  onTelephoneChange(ev) {
    if (ev.inputType !== 'deleteContentBackward') {
      const utel = this.utility.onkeyupFormatPhoneNumberRuntime(
        ev.target.value,
        false
      );
      console.log(utel);
      ev.target.value = utel;
      this.aForm.controls['phone'].patchValue(utel);
      // ev.target.value = utel;
    }
  }

  openLogin() {
    this.nav.pop();
  }

  onPackageSelected(value) {
    console.log(value);
    this.signupObj.package_id = value;
  }

  // packageChanged($event) {
  //   console.log(params);
  // }
}
