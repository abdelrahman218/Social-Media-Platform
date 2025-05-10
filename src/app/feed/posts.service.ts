import { Injectable, signal } from '@angular/core';
import { Comment, Post } from '../app.model';
import { dummyPosts } from './dummy-posts';
import { User } from '../app.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private userFeedPostsSignal = signal<Post[]>(dummyPosts);
  private userPostsSignal=signal<Post[]>([]);
  userFeedPosts = this.userFeedPostsSignal.asReadonly();
  userPosts=this.userPostsSignal.asReadonly();

  likePost(postId: number) {
    const updatedUserFeedPosts = this.userFeedPostsSignal().flatMap((post) => {
      const loggedInUserId : number = 102;
      if (post.id !== postId) {
        return post;
      }

      post.likes.push({ userId: loggedInUserId, time: new Date() });

      return { ...post };
    });
    this.userFeedPostsSignal.set(updatedUserFeedPosts);
  }

  unlikePost(postId: number){
    const updatedUserFeedPosts = this.userFeedPostsSignal().flatMap((post) => {
      const loggedInUserId : number = 102;
      if (post.id !== postId) {
        return post;
      }

      post.likes=post.likes.filter((post) => post.userId !== loggedInUserId);

      return { ...post };
    });
    this.userFeedPostsSignal.set(updatedUserFeedPosts);
  }
  addPost(newPost: Post){
    if(newPost.text_content!=="" || newPost.attachedImagesURLs.length!==0){
      this.userPostsSignal.update((oldPosts)=>[...oldPosts,newPost]);
    }
  }

  addComment(postId: number, comment: Comment){
    if(comment.text===''){
      return
    }
    this.userFeedPostsSignal.set(this.userFeedPosts().map((post)=>{
      if(post.id!==postId){
        return post;
      }

      const oldComments=post.comments;
      return {...post, comments: [...oldComments, comment]};
    }));
  }

  loadNextPosts(){
    this.userFeedPostsSignal.update((oldPosts)=>{return oldPosts.concat(dummyPosts)});
  }
  getPostsByUser(user:User){
    const posts=this.userFeedPosts().filter((post)=>post.postOwner===user);
    this.userPostsSignal.set(posts);
    return posts;
  }
}
