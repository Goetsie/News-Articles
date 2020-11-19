import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WildcardRouteComponent } from './wildcard-route.component';

describe('WildcardRouteComponent', () => {
  let component: WildcardRouteComponent;
  let fixture: ComponentFixture<WildcardRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WildcardRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WildcardRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
