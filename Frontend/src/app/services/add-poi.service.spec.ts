import { TestBed } from '@angular/core/testing';

import { AddPoiService } from './add-poi.service';

describe('AddPoiService', () => {
  let service: AddPoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
