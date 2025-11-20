import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.css'
})
export class CommentFormComponent {
  @Input() postId!: number;
  @Output() commentAdded = new EventEmitter<{ author: string; content: string }>();

  author: string = '';
  content: string = '';
  isSubmitting: boolean = false;

  onSubmit(): void {
    if (this.author.trim() && this.content.trim()) {
      this.isSubmitting = true;
      
      this.commentAdded.emit({
        author: this.author.trim(),
        content: this.content.trim()
      });

      // Form reset
      this.content = '';
      this.isSubmitting = false;
    }
  }

  canSubmit(): boolean {
    return this.author.trim().length > 0 && 
           this.content.trim().length > 0 && 
           !this.isSubmitting;
  }
}