import { CclistModule } from './../../components/cclist/cclist.module';
import { SignupSlideComponent } from './signup-slide/signup-slide.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { IconInputBoxModule } from 'src/app/components/icon-input-box/icon-input-box.module';
import { LoginSlideModule } from './login-slide/login-slide.module';
import { SignupSlideModule } from './signup-slide/signup-slide.module';
import { ForgetpasswordSlideModule } from './forgetpassword-slide/forgetpassword-slide.module';
// import { FooterModule } from 'src/app/components/footer/footer.module';
// import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { SwiperModule } from 'swiper/angular';
import { SignupSlide2Module } from './signup-slide2/signup-slide2.module';
import { SignupSlide3Module } from './signup-slide3/signup-slide3.module';
import { SclistModule } from 'src/app/components/sclist/sclist.module';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { PrivacyPageModule } from './privacy-page/privacy-page.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconInputBoxModule,
    LoginSlideModule,
    SignupSlideModule,
    ForgetpasswordSlideModule,
    SwiperModule,
    SignupSlide2Module,
    SignupSlide3Module,
    CclistModule,
    SclistModule,
    PrivacyPageModule
  ],
  providers:[NgxPubSubService],
  declarations: [LoginPage],
})
export class LoginPageModule {}
