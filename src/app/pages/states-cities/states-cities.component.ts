import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CclistComponent } from 'src/app/components/cclist/cclist.component';
import { SclistComponent } from 'src/app/components/sclist/sclist.component';
import { BasePage } from '../base-page/base-page';
@Component({
  selector: 'app-states-cities',
  templateUrl: './states-cities.component.html',
  styleUrls: ['./states-cities.component.scss'],
})
export class StatesCitiesComponent extends BasePage implements OnInit {
  selectedState: any;
  aForm!: FormGroup;
  state:any;
  city:any;
  data : any = {}
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {this.initialize(); }
  async initialize() {
    this.setupForm();
  }
  inputChange($event, type){
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }
  setupForm() {
    this.aForm = this.formBuilder.group({
     
      city: [
        '', // 12345678
        Validators.compose([Validators.required]),
      ],
      province: [
        '', // 12345678
        Validators.compose([Validators.required]),
      ],

    });
  }

  async openStates() {
    const res = await this.modals.present(SclistComponent, {
      tag: 'States'
    });
    console.log("asdasjahskj", res.data.data);
    this.state = res.data.data
    if (res.data && res.data.data) {
      this.selectedState = res.data.data;
      this.aForm.controls['province'].setValue(res.data.data.name);
    }
  }
  async openCities() {
    if (this.aForm.controls['province'].invalid) {
      return;
    }

    let v = this.aForm.controls['province'].value;

    const res = await this.modals.present(CclistComponent, {
      state: this.selectedState,
    });

    console.log("SELECTED ", res.data.data);
    this.city = res.data.data
    if (res.data && res.data.data) {
      this.aForm.controls['city'].setValue(res.data.data.name);
    }
  }
  async submit(){
    console.log("sdssddsdsds",this.state);
    console.log("city",this.city); 
    this.data = {
      state:this.state,
      city:this.city
    }   
    console.log("this.data",this.data);
    
    
    await this.modals.dismiss({
      item:this.data
    });

    
  }

  back(){
    this.modals.dismiss();
  }
}
