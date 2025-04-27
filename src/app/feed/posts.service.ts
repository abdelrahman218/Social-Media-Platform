import { Injectable, signal } from '@angular/core';
import { Post } from '../app.model';
import { dummyPosts } from './dummy-posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private userFeedPostsSignal = signal<Post[]>(dummyPosts);
  userFeedPosts = this.userFeedPostsSignal.asReadonly();

  likeOrUnlikePost(postId: number) {
    const updatedUserFeedPosts = this.userFeedPostsSignal().flatMap((post) => {
      const loggedInUserId : number = 102;
      if (post.id !== postId) {
        return post;
      }

      const lengthBefore = post.likes.length;

      post.likes=post.likes.filter((post) => post.userId !== loggedInUserId);

      if (lengthBefore === post.likes.length) {
        post.likes.push({ userId: loggedInUserId, time: new Date() });
      }

      return { ...post };
    });
    this.userFeedPostsSignal.set(updatedUserFeedPosts);
  }
}
