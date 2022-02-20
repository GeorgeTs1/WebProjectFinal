import { TestBed } from '@angular/core/testing';

import { SaveCaseService } from './save-case.service';

describe('SaveCaseService', () => {
  let service: SaveCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
