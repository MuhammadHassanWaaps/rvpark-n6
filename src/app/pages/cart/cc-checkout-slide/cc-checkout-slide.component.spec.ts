import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CcCheckoutSlideComponent } from './cc-checkout-slide.component';

describe('CcCheckoutSlideComponent', () => {
  let component: CcCheckoutSlideComponent;
  let fixture: ComponentFixture<CcCheckoutSlideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CcCheckoutSlideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CcCheckoutSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
