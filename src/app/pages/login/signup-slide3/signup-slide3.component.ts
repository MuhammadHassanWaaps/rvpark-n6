import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-signup-slide3',
  templateUrl: './signup-slide3.component.html',
  styleUrls: ['./signup-slide3.component.scss'],
})
export class SignupSlide3Component extends BasePage implements OnInit {
  aForm!: FormGroup;
  // formBuilder: any;
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
    // const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      name_on_card: [
        '', //test@test.com
        Validators.compose([Validators.required]),
      ],
      card_no: [
        '', // 12345678
        Validators.compose([Validators.required]),
      ],
      expire: [
        '', //test@test.com
        Validators.compose([Validators.required]),
      ],
      cvv: [
        '', //test@test.com
        Validators.compose([Validators.required]),
      ],

    });
    console.log(this.aForm.value);

  }
  async gotoDashboardEvent() {
    let data  = await this.network.registerWithRenterTwo(this.aForm.value).then((res)=>{
      if(res.status === 200){
        this.nav.push("pages/dashboard");
      }
    })

    console.log("signup api", data);
    console.log(this.aForm.value)

  }

}
