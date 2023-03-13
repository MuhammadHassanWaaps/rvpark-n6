import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-signup-slide2',
  templateUrl: './signup-slide2.component.html',
  styleUrls: ['./signup-slide2.component.scss'],
})
export class SignupSlide2Component extends BasePage implements OnInit {
step2 = true;
step3 = false;
  aForm!: FormGroup;
  constructor(injector: Injector) {
    super(injector);

  }
    ngOnInit() {
      this.initialize();
    }

  async initialize() {
    this.setupForm();
  }
  inputChange($event, type){
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }
  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
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
        '', //test@test.com
        Validators.compose([Validators.required]),
      ],

    });
  }

  async gotoDashboardEvent() {
    let data  = await this.network.registerWithRenter(this.aForm.value).then((res)=>{
      if(res.status == 200){
        // localStorage.setItem('token', res.token);
        this.step2 = false;
        this.step3 = true;
      }
    })
    // console.log("signup api", data);
    console.log(this.aForm.value)

  }

}
