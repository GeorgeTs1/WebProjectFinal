import { TestBed } from '@angular/core/testing';

import { SaveVisitService } from './save-visit.service';

describe('SaveVisitService', () => {
  let service: SaveVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
