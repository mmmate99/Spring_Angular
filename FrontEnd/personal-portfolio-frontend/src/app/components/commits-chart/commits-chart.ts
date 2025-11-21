import { Component, Input, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { CommitStat } from '../../services/coding-stats';

@Component({
  selector: 'app-commits-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commits-chart.html',
  styleUrl: './commits-chart.css'
})
export class CommitsChartComponent implements AfterViewInit, OnChanges {
  @Input() commits: CommitStat[] = [];
  @Input() height: string = '300px';

  private chart: Chart | undefined;
  private canvas!: HTMLCanvasElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commits'] && this.chart) {
      this.updateChart();
    }
  }

  private createChart(): void {
    this.canvas = this.elementRef.nativeElement.querySelector('#commits-chart');
    
    this.chart = new Chart(this.canvas, {
      type: 'bar',
      data: {
        labels: this.commits.map(commit => commit.month),
        datasets: [{
          label: 'Commitok száma',
          data: this.commits.map(commit => commit.count),
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          borderRadius: 4,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `Commitok: ${context.parsed.y}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#212529',
              stepSize: 10
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
      }
    });
  }

  private updateChart(): void {
    if (!this.chart) return;

    this.chart.data.labels = this.commits.map(commit => commit.month);
    this.chart.data.datasets[0].data = this.commits.map(commit => commit.count);
    
    this.chart.update();
  }

  getTotalCommits(): number {
    return this.commits.reduce((sum, commit) => sum + commit.count, 0);
  }

  getAverageCommits(): number {
    return Math.round(this.getTotalCommits() / this.commits.length);
  }

  getMostActiveMonth(): string {
    const maxCommit = this.commits.reduce((max, commit) => 
      commit.count > max.count ? commit : max
    );
    return maxCommit.month;
  }
}