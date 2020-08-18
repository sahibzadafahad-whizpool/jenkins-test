import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeeVoucherComponent } from './manage-fee-voucher.component';

describe('ManageFeeVoucherComponent', () => {
  let component: ManageFeeVoucherComponent;
  let fixture: ComponentFixture<ManageFeeVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFeeVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeeVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
