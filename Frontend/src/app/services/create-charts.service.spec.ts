import { TestBed } from '@angular/core/testing';

import { CreateChartsService } from './create-charts.service';

describe('CreateChartsService', () => {
  let service: CreateChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
