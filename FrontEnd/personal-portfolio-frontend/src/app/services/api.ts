import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  imageUrl?: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  postId: number;
}

export interface Like {
  id: number;
  userSessionId: string;
  count: number;
  postId: number;
}

export interface PostWithDetails extends Post {
  comments: Comment[];
  likeCount: number;
  userHasLiked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getPostsByCategory(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts/category/${category}`);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments/post/${postId}`);
  }

  addComment(postId: number, comment: { author: string; content: string }): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments/post/${postId}`, comment);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
  }

  toggleLike(postId: number): Observable<Like | null> {
    const userSession = this.getUserSession();
    return this.http.post<Like>(`${this.apiUrl}/likes/post/${postId}`, {}, {
      headers: { 'User-Session': userSession }
    });
  }

  getLikeCount(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/likes/post/${postId}/count`);
  }

  hasUserLiked(postId: number): Observable<boolean> {
    const userSession = this.getUserSession();
    return this.http.get<boolean>(`${this.apiUrl}/likes/post/${postId}/user`, {
      headers: { 'User-Session': userSession }
    });
  }

  private getUserSession(): string {
    let session = localStorage.getItem('userSession');
    if (!session) {
      session = this.generateSessionId();
      localStorage.setItem('userSession', session);
    }
    return session;
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  }
}