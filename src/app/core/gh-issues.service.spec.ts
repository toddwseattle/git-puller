import { TestBed, inject } from '@angular/core/testing';

import { GhIssuesService } from './gh-issues.service';

describe('GhIssuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GhIssuesService]
    });
  });

  it('should be created', inject([GhIssuesService], (service: GhIssuesService) => {
    expect(service).toBeTruthy();
  }));
});
