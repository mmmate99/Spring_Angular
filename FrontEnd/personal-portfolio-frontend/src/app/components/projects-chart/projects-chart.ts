import { Component, Input, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ProjectStatusStat } from '../../services/coding-stats';
import { LanguagesChartComponent } from '../languages-chart/languages-chart';
import { CommitsChartComponent } from '../commits-chart/commits-chart';

@Component({
  selector: 'app-projects-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-chart.html',
  styleUrl: './projects-chart.css'
})
export class ProjectsChartComponent implements AfterViewInit, OnChanges {
  @Input() projects: ProjectStatusStat[] = [];
  @Input() height: string = '300px';

  private chart: Chart | undefined;
  private canvas!: HTMLCanvasElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projects'] && this.chart) {
      this.updateChart();
    }
  }

  private createChart(): void {
    this.canvas = this.elementRef.nativeElement.querySelector('#projects-chart');
    
    this.chart = new Chart(this.canvas, {
      type: 'doughnut',
      data: {
        labels: this.projects.map(project => project.status),
        datasets: [{
          data: this.projects.map(project => project.count),
          backgroundColor: this.projects.map(project => project.color),
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary') || '#ffffff',
          borderWidth: 2,
          hoverOffset: 15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#212529',
              padding: 20,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const total = this.projects.reduce((sum, p) => sum + p.count, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ${context.parsed} projekt (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  private updateChart(): void {
    if (!this.chart) return;

    this.chart.data.labels = this.projects.map(project => project.status);
    this.chart.data.datasets[0].data = this.projects.map(project => project.count);
    this.chart.data.datasets[0].backgroundColor = this.projects.map(project => project.color);
    
    this.chart.update();
  }

  getTotalProjects(): number {
    return this.projects.reduce((sum, project) => sum + project.count, 0);
  }
}