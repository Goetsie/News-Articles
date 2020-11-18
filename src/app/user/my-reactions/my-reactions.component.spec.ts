import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReactionsComponent } from './my-reactions.component';

describe('MyReactionsComponent', () => {
  let component: MyReactionsComponent;
  let fixture: ComponentFixture<MyReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
