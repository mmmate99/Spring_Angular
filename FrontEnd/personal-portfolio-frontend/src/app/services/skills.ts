import { Injectable } from '@angular/core';
import { Skill } from '../components/radar-chart/radar-chart';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  
  getSkills(): Skill[] {
    return [
      // Frontend
      { name: 'TypeScript', level: 7, category: 'Frontend' },
      { name: 'Angular', level: 7, category: 'Frontend' },
      { name: 'JavaScript', level: 8, category: 'Frontend' },
      { name: 'HTML/CSS', level: 9, category: 'Frontend' },
      { name: 'RxJS', level: 4, category: 'Frontend' },
      
      // Backend
      { name: 'Java', level: 8, category: 'Backend' },
      { name: 'Spring Boot', level: 7, category: 'Backend' },
      { name: 'Node.js', level: 6, category: 'Backend' },
      { name: 'REST API', level: 7, category: 'Backend' },
      { name: 'SQL', level: 8, category: 'Backend' },
      
      // DevOps & Tools
      { name: 'Docker', level: 3, category: 'DevOps' },
      { name: 'Git', level: 8, category: 'DevOps' },
      { name: 'AWS', level: 3, category: 'DevOps' },
      { name: 'CI/CD', level: 3, category: 'DevOps' },
      
      // Mobile
      { name: 'Kotlin', level: 6, category: 'Mobile' },
      { name: 'React Native', level: 5, category: 'Mobile' },
      
      // Testing
      { name: 'JUnit', level: 7, category: 'Testing' },

      //Others
      { name: 'C#', level: 8, category: 'Games' },
      { name: 'Unity', level: 6, category: 'Games' },
      { name: 'Unreal', level: 5, category: 'Games' },
      { name: 'C++', level: 6, category: 'Games' }
    ];
  }

  getSkillsByCategory(): { [category: string]: Skill[] } {
    return this.getSkills().reduce((groups, skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
      return groups;
    }, {} as { [category: string]: Skill[] });
  }

  getCategories(): string[] {
    return Object.keys(this.getSkillsByCategory());
  }

  getTopSkills(limit: number = 5): Skill[] {
    return this.getSkills()
      .sort((a, b) => b.level - a.level)
      .slice(0, limit);
  }
}