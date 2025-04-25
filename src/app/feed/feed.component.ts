import { Component, signal } from '@angular/core';
import { Post } from '../app.model';
import { dummyPosts } from './dummy-posts';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-feed',
  imports: [PostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  posts=signal<Post[]>(dummyPosts);
}
