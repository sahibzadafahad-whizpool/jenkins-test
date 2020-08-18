import { TestBed, inject } from '@angular/core/testing';

import { ViewExpenses2Service } from './viewexpenses2.service';

describe('ViewExpenses2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewExpenses2Service]
    });
  });

  it('should be created', inject([ViewExpenses2Service], (service: ViewExpenses2Service) => {
    expect(service).toBeTruthy();
  }));
});
