import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsChart } from './commits-chart';

describe('CommitsChart', () => {
  let component: CommitsChart;
  let fixture: ComponentFixture<CommitsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommitsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
