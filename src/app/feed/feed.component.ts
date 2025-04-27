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
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  private postsService = inject(PostsService);
  private dialog = inject(MatDialog);
  posts = this.postsService.userFeedPosts;

  ngOnInit(){
    this.openNewPostDialog();
  }
  
  openNewPostDialog() {
    this.dialog.open(NewPostFormComponent);
  }
}
