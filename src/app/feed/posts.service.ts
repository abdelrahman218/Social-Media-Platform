import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Comment, Post, UserEssential } from '../app.model';
import { User } from '../app.model';
import { UserService } from '../user/user.service';
import { HttpPostsService } from './http-posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpPostsService = inject(HttpPostsService);
  private userService = inject(UserService);
  private userFeedPostsSignal = signal<Post[]>([]);
  private userPostsSignal = signal<Post[]>([]);
  userFeedPosts = this.userFeedPostsSignal.asReadonly();
  userPosts = this.userPostsSignal.asReadonly();

  //For Testing Purposes
  constructor() {
    this.getFeedPostsFromBackend(this.userService.getCurrentUser()().email);
  }

  getFeedPostsFromBackend(userEmail: string) {
    this.httpPostsService
      .getFeedPosts(userEmail, 30)
      .subscribe((posts: Post[]) => {
        this.userFeedPostsSignal.set(posts);
      });
  }

  likePost(postId: number) {
    this.httpPostsService
      .likePost(postId, this.userService.getCurrentUser()().email)
      .subscribe(() => {
        const updatedUserFeedPosts = this.userFeedPostsSignal().flatMap(
          (post) => {
            const loggedInUser: WritableSignal<UserEssential> =
              this.userService.getCurrentUser();
            if (post.id !== postId) {
              return post;
            }

            post.likes.push({ user: loggedInUser(), time: new Date() });

            return { ...post };
          }
        );
        this.userFeedPostsSignal.set(updatedUserFeedPosts);
      });
  }

  unlikePost(postId: number) {
    this.httpPostsService
      .unLikePost(postId, this.userService.getCurrentUser()().email)
      .subscribe(() => {
        const updatedUserFeedPosts = this.userFeedPostsSignal().flatMap(
          (post) => {
            const loggedInUserId: WritableSignal<UserEssential> =
              this.userService.getCurrentUser();
            if (post.id !== postId) {
              return post;
            }

            post.likes = post.likes.filter(
              (post) => post.user.email !== loggedInUserId().email
            );

            return { ...post };
          }
        );
        this.userFeedPostsSignal.set(updatedUserFeedPosts);
      });
  }

  addPost(newPost: Post, images: FileList | null | undefined) {
    if (newPost.text_content !== '' || images?.length !== 0) {
      this.httpPostsService.postAPost(newPost, images).subscribe(() => {
        this.userPostsSignal.update((oldPosts) => [...oldPosts, newPost]);
      });
    }
  }

  addComment(postId: number, comment: Comment) {
    if (comment.text === '') {
      return;
    }

    this.httpPostsService
      .commentPost(postId, this.userService.getCurrentUser()().email, comment.text)
      .subscribe(() => {
        this.userFeedPostsSignal.set(
          this.userFeedPosts().map((post) => {
            if (post.id !== postId) {
              return post;
            }

            const oldComments = post.comments;
            return { ...post, comments: [...oldComments, comment] };
          })
        );
      });

  }

  loadNextPosts() {
    this.httpPostsService
      .getFeedPosts(this.userService.getCurrentUser()().email, 10)
      .subscribe((posts: Post[]) => {
        this.userFeedPostsSignal.update((oldPosts) => {
          return oldPosts.concat(posts);
        });
      });
  }

  getPostsByUser(user: User) {
    this.httpPostsService
      .getUserPosts(user.email)
      .subscribe((posts: Post[] | null) => {
        console.log('Posts for user:', user.email, posts);
        const safePosts = posts ?? [];
        const userPosts = safePosts.filter((post) => post.postOwner?.email === user.email);
        this.userPostsSignal.set(userPosts);
        console.log('User posts:', userPosts);
      });
  }
}
