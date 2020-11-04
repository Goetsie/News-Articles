import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReactionComponent } from './update-reaction.component';

describe('UpdateReactionComponent', () => {
  let component: UpdateReactionComponent;
  let fixture: ComponentFixture<UpdateReactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
