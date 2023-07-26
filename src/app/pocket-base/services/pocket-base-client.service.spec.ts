import { TestBed } from '@angular/core/testing';

import { PocketBaseClientService } from './pocket-base-client.service';

describe('PocketBaseClientService', () => {
  let service: PocketBaseClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketBaseClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
