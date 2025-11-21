import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-embed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-embed.html',
  styleUrl: './demo-embed.css'
})
export class DemoEmbedComponent {
  @Input() src: string = '';
  @Input() title: string = 'Live Demo';
  @Input() width: string = '100%';
  @Input() height: string = '400px';
  @Input() allowFullscreen: boolean = true;

  get iframeAttributes(): string {
    const attrs = [
      `src="${this.src}"`,
      `title="${this.title}"`,
      `width="${this.width}"`,
      `height="${this.height}"`,
      'frameborder="0"',
      'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
    ];

    if (this.allowFullscreen) {
      attrs.push('allowfullscreen');
    }

    return attrs.join(' ');
  }
}