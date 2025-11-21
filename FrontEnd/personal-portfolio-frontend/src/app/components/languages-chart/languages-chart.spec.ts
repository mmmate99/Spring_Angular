import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesChart } from './languages-chart';

describe('LanguagesChart', () => {
  let component: LanguagesChart;
  let fixture: ComponentFixture<LanguagesChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguagesChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
