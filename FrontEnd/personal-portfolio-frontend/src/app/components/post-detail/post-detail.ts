import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, Comment, ApiService } from '../../services/api';
import { CommentListComponent } from '../comment-list/comment-list';
import { CommentFormComponent } from '../comment-form/comment-form';
import { LikeComponent } from '../like/like';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, CommentListComponent, CommentFormComponent, LikeComponent],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetailComponent implements OnInit {
  @Input() post!: Post;
  
  comments: Comment[] = [];
  likeCount: number = 0;
  userHasLiked: boolean = false;
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadComments();
    this.loadLikeInfo();
  }

  loadComments(): void {
    this.isLoading = true;
    this.apiService.getComments(this.post.id).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
        this.isLoading = false;
      }
    });
  }

  loadLikeInfo(): void {
    this.apiService.getLikeCount(this.post.id).subscribe({
      next: (count) => this.likeCount = count
    });

    this.apiService.hasUserLiked(this.post.id).subscribe({
      next: (hasLiked) => this.userHasLiked = hasLiked
    });
  }

  onCommentAdded(commentData: { author: string; content: string }): void {
    this.apiService.addComment(this.post.id, commentData).subscribe({
      next: (newComment) => {
        this.comments = [newComment, ...this.comments];
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        alert('Hiba történt a hozzászólás küldése során.');
      }
    });
  }

  onCommentDeleted(commentId: number): void {
    this.apiService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
        alert('Hiba történt a hozzászólás törlése során.');
      }
    });
  }

  onLikeToggled(): void {
    this.apiService.toggleLike(this.post.id).subscribe({
      next: (like) => {
        // Ha like objektum jön vissza, akkor like-oltunk
        // Ha null jön vissza, akkor unlike-oltunk
        if (like) {
          this.likeCount++;
          this.userHasLiked = true;
        } else {
          this.likeCount--;
          this.userHasLiked = false;
        }
      },
      error: (error) => {
        console.error('Error toggling like:', error);
      }
    });
  }
}