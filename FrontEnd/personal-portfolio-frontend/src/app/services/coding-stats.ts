import { Injectable } from '@angular/core';

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

export interface CommitStat {
  month: string;
  count: number;
}

export interface ProjectStatusStat {
  status: string;
  count: number;
  color: string;
}

export interface CodingStats {
  languages: LanguageStat[];
  commitsPerMonth: CommitStat[];
  projectsByStatus: ProjectStatusStat[];
  totalCommits: number;
  totalProjects: number;
  codingStreak: number;
}

@Injectable({
  providedIn: 'root'
})
export class CodingStatsService {

  getCodingStats(): CodingStats {
    return {
      languages: this.getLanguageStats(),
      commitsPerMonth: this.getCommitStats(),
      projectsByStatus: this.getProjectStatusStats(),
      totalCommits: 1247,
      totalProjects: 23,
      codingStreak: 45
    };
  }

  private getLanguageStats(): LanguageStat[] {
    return [
      { name: 'TypeScript', percentage: 35, color: '#3178c6', icon: '🟦' },
      { name: 'Java', percentage: 25, color: '#ed8b00', icon: '☕' },
      { name: 'JavaScript', percentage: 20, color: '#f7df1e', icon: '🟨' },
      { name: 'HTML/CSS', percentage: 12, color: '#e34c26', icon: '🎨' },
      { name: 'Python', percentage: 5, color: '#3776ab', icon: '🐍' },
      { name: 'SQL', percentage: 3, color: '#336791', icon: '🗄️' }
    ];
  }

  private getCommitStats(): CommitStat[] {
    const months = ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      month,
      count: Math.floor(Math.random() * 50) + 20 // Random data for demo
    }));
  }

  private getProjectStatusStats(): ProjectStatusStat[] {
    return [
      { status: 'Kész', count: 12, color: '#28a745' },
      { status: 'Folyamatban', count: 6, color: '#17a2b8' },
      { status: 'Tervezés', count: 3, color: '#ffc107' },
      { status: 'Archivált', count: 2, color: '#6c757d' }
    ];
  }

  getGitHubStats() {
    return {
      repositories: 47,
      stars: 128,
      forks: 56,
      contributions: 1247
    };
  }

  getProductivityStats() {
    return {
      averageDailyCommits: 3.2,
      mostProductiveDay: 'Kedd',
      codingHoursPerWeek: 25,
      favoriteTime: 'Est'
    };
  }
}