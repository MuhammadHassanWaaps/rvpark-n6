import { BasePage } from 'src/app/pages/base-page/base-page';
import { FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import { AddSpotComponent } from './add-spot/add-spot.component';
import { Config } from 'src/app/config/main.config';
import { SclistComponent } from 'src/app/components/sclist/sclist.component';
import { CclistComponent } from 'src/app/components/cclist/cclist.component';

@Component({
  selector: 'app-add-rv',
  templateUrl: './add-rv.page.html',
  styleUrls: ['./add-rv.page.scss'],
})
export class AddRvPage extends BasePage implements OnInit {
  aForm!: FormGroup;
  image: any;
  park_id;
  @Input() park;
  @Input() isEdit = false;
  spots = [];
  selectedState: any;
  url;
  urls = [
    {
      id: 1,
      image_url: null,
    },
    {
      id: 2,
      image_url: null,
    },
    {
      id: 3,
      image_url: null,
    },
    {
      id: 4,
      image_url: null,
    },
    {
      id: 5,
      image_url: null,
    },
    {
      id: 6,
      image_url: null,
    },
  ];
  paths: any[] = [];
  spotName: any;
  step = 2;
  loading = false;
  spotlist = [];
  upload_image = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.url = Config.URL;
    this.setupForm();
  }

  inputChange($event, type) {
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }
  getData($event) {
    console.log('aya?', $event);
    this.spotName = $event.data.location;
    console.log('spotName', this.spotName);
  }
  hide() {
    this.spotName = !this.spotName;
  }
  setupForm() {
    this.aForm = this.formBuilder.group({
      id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      province: ['', Validators.compose([Validators.required])],
      country: ['USA', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    });
    console.log('this is value', this.aForm.value);
    if (this.park) {
      if (this.isEdit === true) {
        this.inputChange(this.park.name, 'name');
        this.inputChange(this.park.address, 'address');
        this.inputChange(this.park.city, 'city');
        this.inputChange(this.park.location, 'location');
        this.inputChange(this.park.province, 'province');
        this.inputChange(this.park.country, 'country');
        this.inputChange(this.park.description, 'description');
        this.inputChange(this.park.id, 'id');
        this.park_id = this.park.id;
      }
    }
  }

  async addRv() {
    if (
      this.aForm.controls['name'].value === "" || this.aForm.controls['name'].value === " " || this.aForm.controls['name'].value === undefined ||
      this.aForm.controls['address'].value === "" || this.aForm.controls['address'].value === " " || this.aForm.controls['address'].value === undefined ||
      this.aForm.controls['location'].value === "" || this.aForm.controls['location'].value === " " || this.aForm.controls['location'].value === undefined ||
      this.aForm.controls['city'].value === "" || this.aForm.controls['city'].value === " " || this.aForm.controls['city'].value === undefined ||
      this.aForm.controls['province'].value === "" || this.aForm.controls['province'].value === " " || this.aForm.controls['province'].value === undefined ||
      this.aForm.controls['country'].value === "" || this.aForm.controls['country'].value === " " || this.aForm.controls['country'].value === undefined ||
      this.aForm.controls['description'].value === "" || this.aForm.controls['description'].value === " " || this.aForm.controls['description'].value === undefined
    ) {
      this.alert.showAlert("Enter Details")
    } else {
      if (!this.park_id) {
        this.loading = true;
        const res = await this.network.addPark(this.aForm.value);
        this.utility.presentSuccessToast('Parks Added');
        console.log('getPark', res);
        this.park = res;
        this.park_id = res.id;
      } else {
        this.loading = true;
        const res = await this.network.editPark(this.aForm.value);
        this.utility.presentSuccessToast('Parks Updated');
        console.log('getPark', res);
        this.park_id = res.id;
        this.getSpotList();
      }
      this.step = 2;
      this.loading = false;
    }
  }

  async addSpot() {
    const res = await this.modals.present(AddSpotComponent, {
      park_id: this.park_id,
    });

    if (res) {
      this.getSpotList();
    }

  }

  async getSpotList() {
    const res = await this.network.postAvailableSpot({
      park_id: this.park_id,
    });

    if (res) {
      this.spotlist = res;
    }
  }

  async addSpotImage() {

    const res = await this.modals.present(AddSpotComponent, {
      park_id: this.park_id,
    });
    this.getSpotList();
  }

  async goToEditPark(item) {
    const res = await this.modals.present(AddSpotComponent, {
      park_id: this.park_id,
      item: item,
      edit: true,
    });
    this.getSpotList();
  }

  addImages() {
    this.step = 3;
    if (this.park) {
      if (this.isEdit === true) {
        console.log(this.urls, this.park);
        this.urls = this.park.park_images;
      }
    }
  }

  uploadImage() {
    let element: HTMLElement = document.getElementById(
      'file-input'
    ) as HTMLElement;
    element.click();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        let findIndex = this.urls.findIndex((x) => x.image_url == null);
        if (findIndex != -1) {
          this.urls[findIndex].image_url = event.target.result;
        }
        if (event.target.result) {
          let data = {
            park_id: this.park_id,
            park_images: [event.target.result],
          };
          this.network.uploadImage(data).then((res) => {
            let index = this.urls.length;
            this.urls.push({
              id: index,
              image_url: res.image_url,
            });
          });
        }
      };
    }
  }

  finishProcess() {
    this.modals.dismiss();
    this.events.publish('reload-dashboard');
    this.nav.push('pages/dashboard');
  }

  async deleteImage(items) {
    this.urls = this.urls.filter((item) => item.id !== items.id);
    const res = await this.network.deleteImage({ image_id: items.id });
  }

  async deleteSpot(items) {
    const res = await this.network.deleteSpot({ spot_id: items.id });
    this.getSpotList();
  }

  getItemImage(image) {
    if (image) {
      const res = this.url + image?.image_url;
      return res;
    } else {
      return 'assets/images/fl1.png';
    }
  }


  async openStates() {
    const res = await this.modals.present(SclistComponent, {
      tag: 'States'
    });
    console.log("asd", res.data.data);
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

    console.log("asd", res.data.data);
    if (res.data && res.data.data) {
      this.aForm.controls['city'].setValue(res.data.data.name);
    }

  }
}
