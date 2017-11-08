import { TestBed, inject } from '@angular/core/testing';

import { GhReporgService } from './gh-reporg.service';

describe('GhReporgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GhReporgService]
    });
  });

  it('should be created', inject([GhReporgService], (service: GhReporgService) => {
    expect(service).toBeTruthy();
  }));
});
