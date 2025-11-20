import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Post } from '../../services/api';
import { PostDetailComponent } from '../post-detail/post-detail';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostDetailComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadPosts();
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