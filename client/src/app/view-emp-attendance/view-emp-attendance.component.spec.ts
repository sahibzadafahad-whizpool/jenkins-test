import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpAttendanceComponent } from './view-emp-attendance.component';

describe('ViewEmpAttendanceComponent', () => {
  let component: ViewEmpAttendanceComponent;
  let fixture: ComponentFixture<ViewEmpAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmpAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
