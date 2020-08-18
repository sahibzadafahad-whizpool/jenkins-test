import { TestBed, inject } from '@angular/core/testing';

import { AddExamsService } from './add-exams.service';

describe('AddExamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddExamsService]
    });
  });

  it('should be created', inject([AddExamsService], (service: AddExamsService) => {
    expect(service).toBeTruthy();
  }));
});
