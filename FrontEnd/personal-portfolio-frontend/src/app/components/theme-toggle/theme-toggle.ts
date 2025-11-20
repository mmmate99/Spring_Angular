import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../services/theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css'
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  getThemeIcon(): string {
    return this.themeService.currentTheme() === 'light' ? '🌙' : '☀️';
  }

  getThemeLabel(): string {
    return this.themeService.currentTheme() === 'light' ? 'Sötét mód' : 'Világos mód';
  }
}