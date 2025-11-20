import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  currentTheme = signal<Theme>('light');

  constructor() {
    this.loadInitialTheme();
  }

  private loadInitialTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    this.setTheme(initialTheme);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): Theme {
    return this.currentTheme();
  }
}