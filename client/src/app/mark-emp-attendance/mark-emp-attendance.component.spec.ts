import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkEmpAttendanceComponent } from './mark-emp-attendance.component';

describe('MarkEmpAttendanceComponent', () => {
  let component: MarkEmpAttendanceComponent;
  let fixture: ComponentFixture<MarkEmpAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkEmpAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkEmpAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
