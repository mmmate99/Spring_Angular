import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class BooksComponent {
  books = {
    currentlyReading: [
      {
        title: 'Clean Architecture',
        author: 'Robert C. Martin',
        progress: 65,
        category: 'Szoftverfejlesztés'
      }
    ],
    read: [
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        rating: 5,
        category: 'Szoftverfejlesztés',
        year: 2023
      },
      {
        title: 'Design Patterns',
        author: 'Gang of Four',
        rating: 4,
        category: 'Szoftverfejlesztés', 
        year: 2023
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt, David Thomas',
        rating: 5,
        category: 'Szoftverfejlesztés',
        year: 2022
      }
    ],
    wantToRead: [
      {
        title: 'Domain-Driven Design',
        author: 'Eric Evans',
        category: 'Szoftverfejlesztés'
      },
      {
        title: 'You Don\'t Know JS',
        author: 'Kyle Simpson',
        category: 'JavaScript'
      }
    ]
  };

  getRatingStars(rating: number): string[] {
    return Array(rating).fill('⭐');
  }
}