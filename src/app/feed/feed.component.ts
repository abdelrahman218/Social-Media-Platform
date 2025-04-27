import { Component, inject, signal } from '@angular/core';
import { Post } from '../app.model';
import { dummyPosts } from './dummy-posts';
import { PostComponent } from "./post/post.component";
import { PostsService } from './posts.service';

@Component({
  selector: 'app-feed',
  imports: [PostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  private postsService=inject(PostsService);
  posts=this.postsService.userFeedPosts;
}
