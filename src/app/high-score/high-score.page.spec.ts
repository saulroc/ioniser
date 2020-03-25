import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HighScorePage } from './high-score.page';

describe('HighScorePage', () => {
  let component: HighScorePage;
  let fixture: ComponentFixture<HighScorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighScorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HighScorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
