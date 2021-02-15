import { TestBed } from '@angular/core/testing';

import { TransactionsListService } from './transactions-list.service';

describe('TransactionsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionsListService = TestBed.get(TransactionsListService);
    expect(service).toBeTruthy();
  });
});
