import { Component, Input, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { LanguageStat } from '../../services/coding-stats';

@Component({
  selector: 'app-languages-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './languages-chart.html',
  styleUrl: './languages-chart.css'
})
export class LanguagesChartComponent implements AfterViewInit, OnChanges {
  @Input() languages: LanguageStat[] = [];
  @Input() chartType: 'doughnut' | 'pie' | 'bar' = 'doughnut';
  @Input() height: string = '300px';

  private chart: Chart | undefined;
  private canvas!: HTMLCanvasElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['languages'] && this.chart) {
      this.updateChart();
    }
    if (changes['chartType'] && this.chart) {
      this.chart.destroy();
      this.createChart();
    }
  }

  private createChart(): void {
    this.canvas = this.elementRef.nativeElement.querySelector('#languages-chart');
    
    this.chart = new Chart(this.canvas, {
      type: this.chartType,
      data: {
        labels: this.languages.map(lang => lang.name),
        datasets: [{
          data: this.languages.map(lang => lang.percentage),
          backgroundColor: this.languages.map(lang => lang.color),
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
            position: 'right',
            labels: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#212529',
              font: {
                size: 12,
                weight: 500
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        },
        ...(this.chartType === 'bar' && {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                },
                color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#212529'
              },
              grid: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#dee2e6'
              }
            },
            x: {
              ticks: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#212529'
              },
              grid: {
                color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#dee2e6'
              }
            }
          }
        })
      }
    });
  }

  private updateChart(): void {
    if (!this.chart) return;

    this.chart.data.labels = this.languages.map(lang => lang.name);
    this.chart.data.datasets[0].data = this.languages.map(lang => lang.percentage);
    this.chart.data.datasets[0].backgroundColor = this.languages.map(lang => lang.color);
    
    this.chart.update();
  }

  changeChartType(type: 'doughnut' | 'pie' | 'bar'): void {
    this.chartType = type;
    if (this.chart) {
      this.chart.destroy();
      this.createChart();
    }
  }
}