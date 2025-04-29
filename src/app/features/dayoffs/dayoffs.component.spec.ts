import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayoffsComponent } from './dayoffs.component';

describe('DayoffsComponent', () => {
  let component: DayoffsComponent;
  let fixture: ComponentFixture<DayoffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayoffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
