import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { analysisTabPage } from './analysisTab.page';

describe('analysisTabPage', () => {
  let component: analysisTabPage;
  let fixture: ComponentFixture<analysisTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [analysisTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(analysisTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 