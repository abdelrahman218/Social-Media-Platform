import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Comment, Post, UserEssential } from '../app.model';
import { User } from '../app.model';
import { UserService } from '../user/user.service';
import { HttpPostsService } from './http-posts.service';
import { Observable, of, tap } from 'rxjs';

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
    const currentUser = this.userService.getCurrentUser()();
    if (currentUser) {
      this.getFeedPostsFromBackend(currentUser.email);
    }
  }

  getFeedPostsFromBackend(userEmail: string) {
    this.httpPostsService
      .getFeedPosts(userEmail, 30)
      .subscribe((posts: Post[]) => {
        this.userFeedPostsSignal.set(posts);
      });
  }

  likePost(postId: number) {
    const currentUserSignal = this.userService.getCurrentUser();
    const currentUser = currentUserSignal();
    if (!currentUser) {
      return;
    }
    this.httpPostsService
      .likePost(postId, currentUser.email)
      .subscribe(() => {
        const updatedUserFeedPosts = this.userFeedPostsSignal().flatMap(
          (post) => {
            if (post.id !== postId) {
              return post;
            }
            // Only push like if currentUser is defined
            post.likes.push({ user: currentUser, time: new Date() });

            return { ...post };
          }
        );
        this.userFeedPostsSignal.set(updatedUserFeedPosts);
      });
  }

  unlikePost(postId: number) {
    const currentUserSignal = this.userService.getCurrentUser();
    const currentUser = currentUserSignal();
    if (!currentUser) {
      return;
    }
    this.httpPostsService
      .unLikePost(postId, currentUser.email)
      .subscribe(() => {
        const updatedUserFeedPosts = this.userFeedPostsSignal().flatMap(
          (post) => {
            if (post.id !== postId) {
              return post;
            }

            post.likes = post.likes.filter(
              (like) => like.user.email !== currentUser.email
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

    const currentUser = this.userService.getCurrentUser()();
    if (!currentUser) {
      return;
    }
    this.httpPostsService
      .commentPost(postId, currentUser.email, comment.text)
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
    const currentUser = this.userService.getCurrentUser()();
    if (!currentUser) {
      return;
    }
    this.httpPostsService
      .getFeedPosts(currentUser.email, 10)
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

editPost(postId: number, postText: string, images: FileList | null | undefined,userEmail:string): Observable<any> {
  return this.httpPostsService
    .editPost(postId, postText, images,userEmail)
    .pipe(
      tap(() => {
        // Update the local state after successful API call
        this.userFeedPostsSignal.set(
          this.userFeedPosts().map((post) => {
            if (post.id !== postId) {
              return post;
            }
            return { ...post, text_content: postText };
          })
        );
      })
    );
}

  deletePost(postId: number, userEmail: string) {
    this.httpPostsService.deletePost(postId, userEmail).subscribe(() => {
      this.userFeedPostsSignal.set(
        this.userFeedPosts().filter((post) => post.id !== postId)
      );
      this.userPostsSignal.set(
        this.userPosts().filter((post) => post.id !== postId)
      );
    });
  }
}
