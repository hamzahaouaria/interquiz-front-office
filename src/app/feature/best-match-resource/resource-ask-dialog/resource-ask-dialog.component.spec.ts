import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAskDialogComponent } from './resource-ask-dialog.component';

describe('ResourceAskDialogComponent', () => {
  let component: ResourceAskDialogComponent;
  let fixture: ComponentFixture<ResourceAskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceAskDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
