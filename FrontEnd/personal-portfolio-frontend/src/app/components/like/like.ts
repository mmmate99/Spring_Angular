import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like.html',
  styleUrl: './like.css'
})
export class LikeComponent {
  @Input() likeCount: number = 0;
  @Input() userHasLiked: boolean = false;
  @Input() postId!: number;
  @Output() likeToggled = new EventEmitter<void>();

  isAnimating: boolean = false;

  onLikeClick(): void {
    this.likeToggled.emit();
    this.animateLike();
  }

  private animateLike(): void {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  get likeText(): string {
    return this.userHasLiked ? 'Kedvelem' : 'Tetszik';
  }
}