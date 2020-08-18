import { TestBed, inject } from '@angular/core/testing';

import { ViewExpensesService } from './viewexpenses.service';

describe('ViewexpensesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewExpensesService]
    });
  });

  it('should be created', inject([ViewExpensesService], (service: ViewExpensesService) => {
    expect(service).toBeTruthy();
  }));
});
