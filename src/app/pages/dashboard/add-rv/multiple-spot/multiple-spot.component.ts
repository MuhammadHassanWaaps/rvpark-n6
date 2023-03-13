import { BasePage } from 'src/app/pages/base-page/base-page';
import { Component, OnInit, Injector, Injectable, Input } from '@angular/core';
import { AddSpotComponent } from '../add-spot/add-spot.component';
import { GmapComponent } from '../gmap/gmap.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multiple-spot',
  templateUrl: './multiple-spot.component.html',
  styleUrls: ['./multiple-spot.component.scss'],
})
export class MultipleSpotComponent extends BasePage implements OnInit {
  listData: any;
  searchName: any;
  image: any;
  images: any[] = [];
  @Input() public park_id;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  get f() {
    return this.myForm.controls;
  }
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });
  //   async addSpots(){
  //     let data = await this.modals.present(AddSpotComponent);
  //     this.listData = data.data;
  //     if(this.array.length == 0){
  //       this.array.push(this.listData);
  //     }else{
  //       this.array
  //     }
  //       console.log("what Aya",this.listData);
  //       console.log("array",this.array);
  //     }

  //   back(data){
  //     this.modals.dismiss(data);
  //   }
  // goBack(){
  //   this.modals.dismiss();
  // }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.image = event.target.result;
          this.images.push(this.image);
          console.log('this.images', this.images);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  upload() {
    let data = {
      park_id: this.park_id,
      park_images: this.images,
    };
    this.network.uploadImage(data).then((res) => {
      this.utility.presentSuccessToast("Created Park Successfully");
      this.modals.dismiss();
      this.nav.push("pages/dashboard");
    });
  }
  back() {
    this.modals.dismiss();
  }
  removeImage(item){
    this.images.splice(item);
    console.log("images",this.images);

  }

}
