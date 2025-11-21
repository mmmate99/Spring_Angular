import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Post } from '../../services/api';
import { PostDetailComponent } from '../post-detail/post-detail';
import { RadarChartComponent } from '../radar-chart/radar-chart';
import { SkillsService } from '../../services/skills';
import { CodingStatsService } from '../../services/coding-stats';
import { LanguagesChartComponent } from '../languages-chart/languages-chart';
import { CommitsChartComponent } from '../commits-chart/commits-chart';
import { ProjectsChartComponent } from '../projects-chart/projects-chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostDetailComponent, RadarChartComponent, LanguagesChartComponent, CommitsChartComponent, ProjectsChartComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  skills: any[] = [];
  topSkills: any[] = [];
  codingStats: any;
  githubStats: any;
  productivityStats: any;

  recentGames = [
    {
      title: 'Space Shooter',
      description: 'Egy klasszikus űrcsatázós játék',
      status: 'Kész'
    },
    {
      title: 'Platform Jumper', 
      description: '2D platformjáték',
      status: 'Folyamatban'
    }
  ];

  constructor(
    private apiService: ApiService,
    private skillsService: SkillsService,
    private codingStatsService: CodingStatsService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
    this.loadSkills();
    this.loadCodingStats();
  }

  loadCodingStats(){
    this.codingStats = this.codingStatsService.getCodingStats();
    this.githubStats = this.codingStatsService.getCodingStats();
    this.productivityStats = this.codingStatsService.getProductivityStats();
  }

  loadSkills(): void{
    this.skills = this.skillsService.getSkills();
    this.topSkills = this.skillsService.getTopSkills();
  }

  getSkillColor(level: number): string{
    if (level >= 9) return '#28a745';
    if (level >= 7) return '#17a2b8';
    if (level >= 5) return '#ffc107';
    if (level >= 3) return '#fd7e14';
    return '#dc3545';
  }

  getCategories(): string[]{
    return this.skillsService.getCategories();
  }

  getAverageLevel(): number{
    const total = this.skills.reduce((sum, skill) => sum + skill.level, 0);
    return Math.round((total / this.skills.length) * 10) /10;
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log('Posts loaded:', posts);
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        // Fallback adatok ha az API nem elérhető
        /*this.posts = [
          {
            id: 1,
            title: 'Üdvözöllek!',
            content: 'Ez az én személyes portfólió oldalam. Itt találsz információkat a játékfejlesztési projekteimről, kedvenc könyveimről és elérhetőségeimről.',
            category: 'NEWS',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            title: 'Új projekt elkezdve',
            content: 'Épp most kezdtem el egy új játék fejlesztési projektet Unity-ben. A játék egy 2D platformer lesz, ami retro stílusú grafikát használ.',
            category: 'FEJLESZTÉS',
            createdAt: new Date().toISOString()
          }
        ];*/
      }
    });
  }
}