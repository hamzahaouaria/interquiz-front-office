import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestMatchResourceComponent } from './best-match-resource.component';

describe('BestMatchResourceComponent', () => {
  let component: BestMatchResourceComponent;
  let fixture: ComponentFixture<BestMatchResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestMatchResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestMatchResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
