import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeDiscountsComponent } from './manage-fee-discounts.component';

describe('ManageFeeDiscountsComponent', () => {
  let component: ManageFeeDiscountsComponent;
  let fixture: ComponentFixture<ManageFeeDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFeeDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeeDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
