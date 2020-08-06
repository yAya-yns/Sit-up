import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { profileTabPage } from './profileTab.page';

describe('profileTabPage', () => {
  let component: profileTabPage;
  let fixture: ComponentFixture<profileTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [profileTabPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(profileTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
