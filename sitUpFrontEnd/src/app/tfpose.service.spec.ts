import { TestBed } from '@angular/core/testing';

import { TfposeService } from './tfpose.service';

describe('TfposeService', () => {
  let service: TfposeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfposeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
