import { inject, Injectable } from '@angular/core';
import { BackendAdapter } from '../BackendAdapter/BackendAdapter';
import { SpringBootBackendAdapter } from '../BackendAdapter/SpringBootBackendAdapter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { Post } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class HttpPostsService {
  readonly baseUserUri = 'http://localhost:8080/user';
  private backendAdapter: BackendAdapter = inject(SpringBootBackendAdapter);
  private httpClient = inject(HttpClient);

  getFeedPosts(userEmail: string, numOfPosts: number): Observable<Post[]> {
    const params = new HttpParams().set('userEmail', userEmail).set('numOfPosts', numOfPosts);

    return this.httpClient.get<Post[]>(this.baseUserUri + '/getFeedPosts', { params }).pipe(
      map((response: any) => response),
      map((response: any[]) => this.backendAdapter.postsAdapter(response)),
      take(1)
    );
  }

  postAPost(newPost: Post, images: FileList | null | undefined): Observable<void> {
    return this.httpClient.post<void>(
      this.baseUserUri + '/postAPost',
      this.backendAdapter.backendNewPostAdapter(newPost, images)
    );
  }

  likePost(postId: number, userEmail: string): Observable<void> {
    return this.httpClient.post<void>(this.baseUserUri + '/likePost', { postId, userEmail }).pipe(take(1));
  }

  unLikePost(postId: number, userEmail: string): Observable<void> {
    return this.httpClient.post<void>(this.baseUserUri + '/unlikePost', { postId, userEmail }).pipe(take(1));
  }

  commentPost(postId: number, userEmail: string, commentText: string): Observable<void> {
    return this.httpClient.post<void>(this.baseUserUri + '/commentPost', { postId, userEmail, commentText }).pipe(take(1));
  }
  getUserPosts(email: string): Observable<any[]> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.get<any[]>(`${this.baseUserUri}/getUserPosts`, { params }).pipe(
      map((response: any[]) => this.backendAdapter.postsAdapter(response))
    );
  }
  editPost(postId: number, postText: string, images: FileList | null | undefined): Observable<void> {
    return this.httpClient.put<void>(
      this.baseUserUri + '/editPost',
      this.backendAdapter.backendEditPostAdapter(postId, postText, images)
    );
  }
}
