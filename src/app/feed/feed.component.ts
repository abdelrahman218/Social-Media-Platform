import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from './post/post.component';
import { PostsService } from './posts.service';
import { NewPostFormComponent } from './new-post-form/new-post-form.component';

@Component({
  selector: 'app-feed',
  imports: [PostComponent, MatIconModule, MatButtonModule],
  host: {
    '(scroll)': 'this.onScroll($event)',
  },
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  private postsService = inject(PostsService);
  private dialog = inject(MatDialog);
  posts = this.postsService.userFeedPosts;
  
  openNewPostDialog() {
    this.dialog.open(NewPostFormComponent);
  }

  private atBottom(event: any) {
    const limit = event.target.scrollHeight - event.target.clientHeight;

    return event.target.scrollTop === limit;
  }

  onScroll(event: any) {
    if(!this.atBottom(event)) {
      return;
    }

    this.postsService.loadNextPosts();
  }

}
