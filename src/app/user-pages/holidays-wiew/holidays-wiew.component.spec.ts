import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysWiewComponent } from './holidays-wiew.component';

describe('HolidaysWiewComponent', () => {
  let component: HolidaysWiewComponent;
  let fixture: ComponentFixture<HolidaysWiewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidaysWiewComponent]
    });
    fixture = TestBed.createComponent(HolidaysWiewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
