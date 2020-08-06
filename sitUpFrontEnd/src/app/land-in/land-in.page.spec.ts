import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandInPage } from './land-in.page';

describe('LandInPage', () => {
  let component: LandInPage;
  let fixture: ComponentFixture<LandInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
