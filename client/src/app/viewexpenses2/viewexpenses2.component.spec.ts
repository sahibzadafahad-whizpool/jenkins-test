import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExpenses2Component } from './viewexpenses2.component';

describe('ViewExpenses2Component', () => {
  let component: ViewExpenses2Component;
  let fixture: ComponentFixture<ViewExpenses2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExpenses2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExpenses2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
