import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayViewAdminComponent } from './holiday-view-admin.component';

describe('HolidayViewAdminComponent', () => {
  let component: HolidayViewAdminComponent;
  let fixture: ComponentFixture<HolidayViewAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayViewAdminComponent]
    });
    fixture = TestBed.createComponent(HolidayViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
