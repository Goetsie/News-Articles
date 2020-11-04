import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReactionComponent } from './add-reaction.component';

describe('AddReactionComponent', () => {
  let component: AddReactionComponent;
  let fixture: ComponentFixture<AddReactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
