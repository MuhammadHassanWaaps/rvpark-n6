import { BasePage } from 'src/app/pages/base-page/base-page';
import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CclistComponent } from 'src/app/components/cclist/cclist.component';
import { SclistComponent } from 'src/app/components/sclist/sclist.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent  extends BasePage implements OnInit {

  aForm!: FormGroup;
  bForm!: FormGroup;
  cForm!: FormGroup;
  cities = [];
  states = [];
  loading = false;
  selectedState: any;
  park_id;
  urls = [
    {
      id: 1,
      link: null
    },
    {
      id: 2,
      link: null
    },
    {
      id: 3,
      link: null
    },
    {
      id: 4,
      link: null
    },
    {
      id: 5,
      link: null
    },
    {
      id: 6,
      link: null
    },
  ];
  constructor(injector: Injector) {
    super(injector);
  }

  profile_image = 'assets/images/plus.png'

  ngOnInit() {
    this.initialize();
  }

  closeModal() {
    this.modals.dismiss();
  }

  async initialize() {
    this.setupForm();

    const res = await this.network.getUserData();
    console.log(res);
    this.inputChange(res.name, 'name')
    this.inputChange(res.profile.street_address, 'street_address')
    this.inputChange(res.profile.city, 'city')
    this.inputChange(res.profile.province, 'province')
    // this.inputChange(res.profile.country, 'country')
  }

  cancel(){
    this.modals.dismiss();
  }

  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({

      name: [
        '', //test@test.com
        Validators.compose([Validators.required]),
      ],
      street_address: [
        '', //test@test.com
        Validators.compose([Validators.required]),
      ],
      city: [
        '', // 12345678
        Validators.compose([Validators.required,]),
      ],
      province: [
        '', // 12345678
        Validators.compose([Validators.required,]),
      ],
      country: [
        'USA', // 12345678
        Validators.compose([Validators.required,]),
      ],
      // name_on_card: [
      //   '', // 12345678
      //   Validators.compose([Validators.required,]),
      // ],
      // card_no: [
      //   '', // 12345678
      //   Validators.compose([Validators.required,]),
      // ],
      // expire: [
      //   '', // 12345678
      //   Validators.compose([Validators.required,]),
      // ],
    });
  }

  inputChange($event, type){
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }

  async addUpdateProfile(){

    if(this.aForm.invalid){
      const err = this.formErrors.getFirstFormError(this.aForm);
      this.utility.presentFailureToast(err);
      return;
    }

    this.loading = true;
    let res = await this.network.editUserProfile(this.aForm.value);
    console.log(res);
    this.modals.dismiss(res);
    this.loading = false;
    // console.log(res);
    // if(res){
    //   console.log("response",res);
    //   this.nav.navigateTo("/pages/dashboard");
    // }
  }


  uploadImage(){
    let element: HTMLElement = document.getElementById('file-input') as HTMLElement;
    element.click()
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        if(event.target.result){
          let data = {
            image: event.target.result,
          };
          this.network.uploadProfilePicture(data).then((res) => {
          });
        }
      }
    }
  }
  async openStates(){
    const res = await this.modals.present(SclistComponent, {
      tag: 'States'
    });
    console.log("asd",res.data.data);
    if(res.data && res.data.data){
      this.selectedState = res.data.data;
      this.aForm.controls['province'].setValue(res.data.data.name);
    }

    }
  async openCities(){


    if(this.aForm.controls['province'].invalid){
      return;
    }

    let v = this.aForm.controls['province'].value;

    const res = await this.modals.present(CclistComponent, {
      state: this.selectedState,
    });

    console.log("asd",res.data.data);
    if(res.data && res.data.data){
      this.aForm.controls['city'].setValue(res.data.data.name);
    }


}
}
