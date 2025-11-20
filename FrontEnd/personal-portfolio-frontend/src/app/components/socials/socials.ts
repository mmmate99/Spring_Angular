import { Component } from '@angular/core';

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [],
  templateUrl: './socials.html',
  styleUrl: './socials.css'
})
export class SocialsComponent {
  socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: '💻',
      description: 'Itt találod a projektjeim forráskódját',
      username: '@yourusername'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourprofile',
      icon: '💼', 
      description: 'Szakmai profilom és kapcsolataim',
      username: '@yourprofile'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourhandle',
      icon: '🐦',
      description: 'Rövid gondolatok és hírek',
      username: '@yourhandle'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/yourchannel',
      icon: '🎥',
      description: 'Fejlesztési videók és tutorialok',
      username: '@yourchannel'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/yourserver',
      icon: '💬',
      description: 'Közösségi szerverem',
      username: 'yourusername'
    },
    {
      name: 'Email',
      url: 'mailto:your.email@example.com',
      icon: '📧',
      description: 'Közvetlen kapcsolat',
      username: 'your.email@example.com'
    }
  ];
}