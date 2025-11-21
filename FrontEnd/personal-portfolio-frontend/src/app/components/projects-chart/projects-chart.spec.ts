import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsChart } from './projects-chart';

describe('ProjectsChart', () => {
  let component: ProjectsChart;
  let fixture: ComponentFixture<ProjectsChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
