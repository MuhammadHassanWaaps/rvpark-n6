import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { InterceptorService } from './services/interceptor.service';
import { UtilityService } from './services/utility.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SwiperModule } from 'swiper/angular';
import { CartPageModule } from './pages/cart/cart.module';
import { FilterPipePipe } from './components/filter-pipe.pipe';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { NgxPubSubModule, NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { FirebaseService } from './services/firebase.service';
import { EventsService } from './services/events.service';
import { CalendarModule } from 'ion2-calendar';
@NgModule({
  declarations: [AppComponent, FilterPipePipe],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    CartPageModule,
    CalendarModule

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    FormBuilder,
    UtilityService,
    InAppBrowser,
    UtilityService,
    Geolocation,
    Stripe,
    NgxPubSubService,
    FirebaseService,
    EventsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
