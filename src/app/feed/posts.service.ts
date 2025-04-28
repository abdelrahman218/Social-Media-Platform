import { Injectable, signal } from '@angular/core';
import { Post } from '../app.model';
import { dummyPosts } from './dummy-posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private userFeedPostsSignal = signal<Post[]>(dummyPosts);
  private userPostsSignal=signal<Post[]>([]);
  userFeedPosts = this.userFeedPostsSignal.asReadonly();
  userPosts=this.userPostsSignal.asReadonly();

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

  addPost(newPost: Post){
    console.log(newPost);
    if(newPost.text_content!=="" || newPost.attachedImagesURLs.length!==0){
      this.userPostsSignal.update((oldPosts)=>[...oldPosts,newPost]);
      console.log(this.userPosts());
    }
  }
}
