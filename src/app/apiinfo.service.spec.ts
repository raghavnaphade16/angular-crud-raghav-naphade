import { TestBed } from '@angular/core/testing';

import { APIInfoService } from './apiinfo.service';

describe('APIInfoService', () => {
  let service: APIInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
