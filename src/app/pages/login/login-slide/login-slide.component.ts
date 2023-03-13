import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BasePage } from '../../base-page/base-page';

@Component({
  selector: 'app-login-slide',
  templateUrl: './login-slide.component.html',
  styleUrls: ['./login-slide.component.scss'],
})
export class LoginSlideComponent extends BasePage implements OnInit {
  @Output('gotoSignup') gotoSignup: EventEmitter<any> = new EventEmitter<any>();
  @Output('gotoDashboard') gotoDashboard: EventEmitter<any> =
    new EventEmitter<any>();

  @Output('gotoFbp') gotoFbp: EventEmitter<any> = new EventEmitter<any>();

  passwordType: string = 'password';
  remember_me = false;

  aForm!: FormGroup;
  loading = false;
  constructor(injector: Injector, private actionSheetCtrl: ActionSheetController, ) {
    super(injector);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    this.setupForm();
   
  }

  addItem() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  inputChange($event, type){
    console.log($event, type);
    this.aForm.controls[type].setValue($event);
  }
  setupForm() {
    const re = /\S+@\S+\.\S+/;

    this.aForm = this.formBuilder.group({
      email: [
        '', //test@test.com
        Validators.compose([Validators.required, Validators.pattern(re)]),
      ],
      password: [
        '', // 12345678
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.required,
        ]),
      ],
      remember_me: [false]
    });
  }


  gotoFp() {
    console.log('peak');
    this.gotoFbp.emit({ timestamp: Date.now() });
  }

  gotoSignupEvent() {
    this.gotoSignup.emit({ timestamp: Date.now() });
  }

  async gotoDashboardEvent() {

    if(this.aForm.invalid){
      const err = this.formErrors.getFirstFormError(this.aForm);
      this.utility.presentFailureToast(err);
      return;
    }

    this.loading = true;
    let res = await this.users.login(this.aForm.value) as any;
    this.loading = false;
    console.log(res);
    if(res){

      localStorage.setItem( 'remember_me', `${this.remember_me}`);

      console.log("response",res);
      this.events.publish("reload-dashboard");
      this.nav.navigateTo("/pages/dashboard");
    }

      // if(res.status == 200){
      //   console.log("hello");

      //   this.nav.push("pages/dashboard");
      // }


    return;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select User Type',
      subHeader: 'This will remove in production deployment',
      buttons: [
        {
          text: 'User',
          role: 'destructive',
          data: {
            action: 'user',
          },
        },
        {
          text: 'Vendor',
          data: {
            action: 'vendor',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();

    console.log(result);

    if(result && result.data && result.data.action){

      if(result.data.action == 'user'){
        console.log('user-set');
        localStorage.setItem('usertype', 'user');
        this.gotoDashboard.emit({ timestamp: Date.now() });
      }

      if(result.data.action == 'vendor'){
        console.log('vendor-set')
        localStorage.setItem('usertype', 'vendor')
        this.gotoDashboard.emit({ timestamp: Date.now() });
      }

    }








    // this.gotoDashboard.emit({ timestamp: Date.now() });
  }
}
