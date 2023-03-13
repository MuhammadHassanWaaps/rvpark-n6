import { NetworkService } from 'src/app/services/network.service';
import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-shipping-address-form',
  templateUrl: './shipping-address-form.component.html',
  styleUrls: ['./shipping-address-form.component.scss'],
})
export class ShippingAddressFormComponent extends BasePage implements OnInit {

  loading = false;
  aForm!: FormGroup;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.setupForm();
    this.initialize();
  }

  async initialize(){
    const res = await this.network.getShippingAddress();
    console.log(res);

    if(res){
      this.inputChange(res['name'], 'name')
      this.inputChange(res['address_line_one'], 'address_line_one')
      this.inputChange(res['address_line_two'], 'address_line_two')
      this.inputChange(res['address_line_three'], 'address_line_three')

    }



  }

  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.required]),
      ],
      address_line_one: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      address_line_two: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      address_line_three: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  inputChange($event, type){
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }

  async addUpdateShippingAddress(){

    if(this.aForm.invalid){
      const err = this.formErrors.getFirstFormError(this.aForm);
      this.utility.presentFailureToast(err);
      return;
    }

    this.loading = true;
    let res = await this.network.setShippingAddress(this.aForm.value);
    console.log(res);
    this.modals.dismiss(res);
    this.loading = false;
    // console.log(res);
    // if(res){
    //   console.log("response",res);
    //   this.nav.navigateTo("/pages/dashboard");
    // }
  }
}
