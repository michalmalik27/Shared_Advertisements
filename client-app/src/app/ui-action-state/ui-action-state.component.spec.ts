import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiActionStateComponent } from './ui-action-state.component';

describe('UiActionStateComponent', () => {
  let component: UiActionStateComponent;
  let fixture: ComponentFixture<UiActionStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiActionStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiActionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
