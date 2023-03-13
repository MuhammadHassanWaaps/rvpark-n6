import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgetpasswordSlideComponent } from './forgetpassword-slide.component';

describe('ForgetpasswordSlideComponent', () => {
  let component: ForgetpasswordSlideComponent;
  let fixture: ComponentFixture<ForgetpasswordSlideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetpasswordSlideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetpasswordSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
