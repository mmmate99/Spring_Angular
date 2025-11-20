import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit{
  title = 'Személyes Portfólió';

  constructor(private themeService: ThemeService){}

  ngOnInit(): void {
    
  }
}