import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../services/api';
import { CommentComponent } from '../comment/comment';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css'
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  @Output() deleteComment = new EventEmitter<number>();

  onDeleteComment(commentId: number): void {
    this.deleteComment.emit(commentId);
  }
}