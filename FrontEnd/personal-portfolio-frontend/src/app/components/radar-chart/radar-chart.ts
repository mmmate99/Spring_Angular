import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

export interface Skill {
  name: string;
  level: number; // 1-10
  category: string;
}

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radar-chart.html',
  styleUrl: './radar-chart.css'
})
export class RadarChartComponent implements AfterViewInit, OnChanges {
  @Input() skills: Skill[] = [];
  @Input() width: string = '400px';
  @Input() height: string = '400px';
  @Input() showLegend: boolean = true;

  private chart: Chart | undefined;
  private canvas!: HTMLCanvasElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['skills'] && this.chart) {
      this.updateChart();
    }
  }

  private createChart(): void {
    this.canvas = this.elementRef.nativeElement.querySelector('#radar-chart');
    
    const groupedSkills = this.groupSkillsByCategory();
    const categories = Object.keys(groupedSkills);

    this.chart = new Chart(this.canvas, {
      type: 'radar',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Technológiai tudás',
            data: categories.map(category => {
              const categorySkills = groupedSkills[category];
              const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
              return (avgLevel / 10) * 100; // Convert to percentage
            }),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            min: 0,
            ticks: {
              stepSize: 20,
              callback: function(value) {
                return value + '%';
              }
            },
            pointLabels: {
              font: {
                size: 12,
                weight: 'bold'
              },
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#212529'
            },
            grid: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#dee2e6'
            },
            angleLines: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#dee2e6'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const category = categories[context.dataIndex];
                const skills = groupedSkills[category];
                const skillNames = skills.map(skill => skill.name).join(', ');
                return `${category}: ${context.parsed.r}% (${skillNames})`;
              }
            }
          }
        }
      }
    });
  }

  private groupSkillsByCategory(): { [category: string]: Skill[] } {
    return this.skills.reduce((groups, skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
      return groups;
    }, {} as { [category: string]: Skill[] });
  }

  private updateChart(): void {
    if (!this.chart) return;

    const groupedSkills = this.groupSkillsByCategory();
    const categories = Object.keys(groupedSkills);

    this.chart.data.labels = categories;
    this.chart.data.datasets[0].data = categories.map(category => {
      const categorySkills = groupedSkills[category];
      const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
      return (avgLevel / 10) * 100;
    });

    this.chart.update();
  }

  getSkillLevelText(level: number): string {
    if (level >= 9) return 'Expert';
    if (level >= 7) return 'Haladó';
    if (level >= 5) return 'Középhaladó';
    if (level >= 3) return 'Kezdő';
    return 'Alap';
  }

  getSkillLevelColor(level: number): string {
    if (level >= 9) return '#28a745'; // Green
    if (level >= 7) return '#17a2b8'; // Blue
    if (level >= 5) return '#ffc107'; // Yellow
    if (level >= 3) return '#fd7e14'; // Orange
    return '#dc3545'; // Red
  }
}