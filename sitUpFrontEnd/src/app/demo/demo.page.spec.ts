import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemoPage } from './demo.page';

describe('DemoPage', () => {
  let component: DemoPage;
  let fixture: ComponentFixture<DemoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
