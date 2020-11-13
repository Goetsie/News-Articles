import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistFormComponent } from './journalist-form.component';

describe('JournalistFormComponent', () => {
  let component: JournalistFormComponent;
  let fixture: ComponentFixture<JournalistFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalistFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
