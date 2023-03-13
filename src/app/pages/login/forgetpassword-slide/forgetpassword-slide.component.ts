import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-forgetpassword-slide',
  templateUrl: './forgetpassword-slide.component.html',
  styleUrls: ['./forgetpassword-slide.component.scss'],
})
export class ForgetpasswordSlideComponent extends BasePage implements OnInit {
  @Output('gotoSignup') gotoSignup: EventEmitter<any> = new EventEmitter<any>();
  @Output('gotoDashboard') gotoDashboard: EventEmitter<any> =
    new EventEmitter<any>();

  aForm;
  loading = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.setupForm();
  }

  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      email: [
        'renter23@mail.com', //test@test.com
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  gotoSignupEvent() {
    this.gotoSignup.emit({ timestamp: Date.now() });
  }

  inputChange($event, type){
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }

  async gotoDashboardEvent() {


    if(this.aForm.invalid){
      const err = this.formErrors.getFirstFormError(this.aForm);
      this.utility.presentFailureToast(err);
      return;
    }

    this.loading = true;
    let res = await this.users.sendResetPassword(this.aForm.value) as any;
    this.loading = false;
    console.log(res);
    this.utility.presentSuccessToast("Email send successfully for reset password");


    // this.gotoDashboard.emit({ timestamp: Date.now() });

  }
}
