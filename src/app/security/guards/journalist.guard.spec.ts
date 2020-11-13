import { TestBed } from '@angular/core/testing';

import { JournalistGuard } from './journalist.guard';

describe('JournalistGuard', () => {
  let guard: JournalistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JournalistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
