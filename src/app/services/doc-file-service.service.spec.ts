import { TestBed } from '@angular/core/testing';

import { DocFileServiceService } from './doc-file-service.service';

describe('DocFileServiceService', () => {
  let service: DocFileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocFileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
