import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeCategorySliderBoxesComponent } from './home-category-slider-boxes.component';

describe('HomeCategorySliderBoxesComponent', () => {
  let component: HomeCategorySliderBoxesComponent;
  let fixture: ComponentFixture<HomeCategorySliderBoxesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCategorySliderBoxesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCategorySliderBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
