import { MultipleSpotComponent } from './../../pages/dashboard/add-rv/multiple-spot/multiple-spot.component';
import { BasePage } from 'src/app/pages/base-page/base-page';
import { NavService } from './../../services/basic/nav.service';
import { Component, Input, OnInit, Output, EventEmitter, Injector } from '@angular/core';

@Component({
  selector: 'app-icon-input-box',
  templateUrl: './icon-input-box.component.html',
  styleUrls: ['./icon-input-box.component.scss'],
})
export class IconInputBoxComponent extends BasePage implements OnInit {
  @Input('leftIcon') leftIcon;
  @Input('rightIcon') rightIcon;
  @Input('placeholder') placeholder;
  @Input('type') type;
  @Input('color') color = 'medium';
  @Input('value') value = '';
  @Input('readonly') readonly = false;



  @Output() lefticonClicks = new EventEmitter<string>();
  @Output() spots = new EventEmitter<string>();
  @Output() inputChange = new EventEmitter<string>();

  @Output() changing = new EventEmitter<string>();

  togglePassword = false;
  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {}
  lefticonClick() {
    this.lefticonClicks.emit();
  }

  inputChangeFire($event){
    let v = $event.target.value;
    console.log(v)
    this.inputChange.emit(v);
  }
  changeEvent($event){
let v = $event.target.value;
console.log(v);

this.changing.emit(v);
  }

  showPassword() {
    if (this.type == 'password') {
      this.togglePassword = !this.togglePassword;
    }
  }
}
