import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistOverviewComponent } from './journalist-overview.component';

describe('JournalistOverviewComponent', () => {
  let component: JournalistOverviewComponent;
  let fixture: ComponentFixture<JournalistOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalistOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
