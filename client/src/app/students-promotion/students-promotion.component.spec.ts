import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsPromotionComponent } from './students-promotion.component';

describe('StudentsPromotionComponent', () => {
  let component: StudentsPromotionComponent;
  let fixture: ComponentFixture<StudentsPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
