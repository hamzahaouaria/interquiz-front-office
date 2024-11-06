import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionNavigatorComponent } from './mission-navigator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MissionNavigatorComponent', () => {
  let component: MissionNavigatorComponent;
  let fixture: ComponentFixture<MissionNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionNavigatorComponent,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
