import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.html',
  styleUrl: './games.css'
})
export class GamesComponent {
  games = [
    {
      title: 'Space Shooter',
      description: 'Egy klasszikus űrcsatázós játék, ahol ellenséges űrhajókat kell elpusztítanod. A játék tartalmaz különböző fegyvereket és power-up-okat.',
      technologies: ['Unity', 'C#', 'Photoshop'],
      status: 'Kész',
      githubUrl: 'https://github.com/yourname/space-shooter',
      demoUrl: '#',
      image: '/assets/images/space-shooter.jpg',
      features: ['3 különböző fegyver', 'Boss harcok', 'Score system']
    },
    {
      title: 'Platform Jumper',
      description: '2D platformjáték, ahol különböző akadályokat kell legyűrnöd és szinteket teljesítened. A játék fizikai motorja valósághű ugrásokat és mozgást biztosít.',
      technologies: ['Unity', 'C#', 'Aseprite'],
      status: 'Folyamatban',
      githubUrl: 'https://github.com/yourname/platform-jumper',
      demoUrl: '#',
      image: '/assets/images/platform-jumper.jpg',
      features: ['10+ szint', 'Különböző karakterek', 'Edző mód']
    },
    {
      title: 'Puzzle Adventure',
      description: 'Logikai rejtvény játék, ahol különböző puzzle-öket kell megoldanod a történet előrehaladtával. Minden puzzle egyedi mechanikával rendelkezik.',
      technologies: ['Godot', 'GDScript', 'Blender'],
      status: 'Tervezés',
      githubUrl: '#',
      demoUrl: '#',
      image: '/assets/images/puzzle-adventure.jpg',
      features: ['50+ puzzle', 'Bonyolult történet', 'Többjátékos mód']
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Kész': return 'bg-success';
      case 'Folyamatban': return 'bg-warning';
      case 'Tervezés': return 'bg-secondary';
      default: return 'bg-info';
    }
  }
}