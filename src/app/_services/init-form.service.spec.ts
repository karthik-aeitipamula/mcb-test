import { TestBed } from '@angular/core/testing';

import { InitFormService } from './init-form.service';

describe('InitFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitFormService = TestBed.get(InitFormService);
    expect(service).toBeTruthy();
  });
});
