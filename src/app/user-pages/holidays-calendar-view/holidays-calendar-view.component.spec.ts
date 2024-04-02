import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysCalendarViewComponent } from './holidays-calendar-view.component';

describe('HolidaysCalendarViewComponent', () => {
  let component: HolidaysCalendarViewComponent;
  let fixture: ComponentFixture<HolidaysCalendarViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidaysCalendarViewComponent]
    });
    fixture = TestBed.createComponent(HolidaysCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
