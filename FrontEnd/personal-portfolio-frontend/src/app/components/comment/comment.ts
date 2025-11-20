import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../services/api';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.html',
  styleUrl: './comment.css'
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    if (confirm('Biztosan törölni szeretnéd ezt a kommentet?')) {
      this.delete.emit(this.comment.id);
    }
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'épp most';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} perce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} órája`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} napja`;
    
    return date.toLocaleDateString('hu-HU');
  }
}