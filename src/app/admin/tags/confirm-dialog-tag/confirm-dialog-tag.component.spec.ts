import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogTagComponent } from './confirm-dialog-tag.component';

describe('ConfirmDialogTagComponent', () => {
  let component: ConfirmDialogTagComponent;
  let fixture: ComponentFixture<ConfirmDialogTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
