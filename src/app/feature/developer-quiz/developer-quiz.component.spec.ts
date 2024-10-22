import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperQuizComponent } from './developer-quiz.component';

describe('DeveloperQuizComponent', () => {
  let component: DeveloperQuizComponent;
  let fixture: ComponentFixture<DeveloperQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
