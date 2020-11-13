import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArticleDialogComponent } from './show-article-dialog.component';

describe('ShowArticleDialogComponent', () => {
  let component: ShowArticleDialogComponent;
  let fixture: ComponentFixture<ShowArticleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowArticleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowArticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
