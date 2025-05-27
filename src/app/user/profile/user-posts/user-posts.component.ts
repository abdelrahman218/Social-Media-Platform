import { Component,inject, OnInit } from '@angular/core';
import { PostComponent } from '../../../feed/post/post.component';
import { PostsService } from '../../../feed/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NewPostFormComponent } from '../../../feed/new-post-form/new-post-form.component';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-user-posts',
  imports: [PostComponent,MatIconModule,MatButtonModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent implements OnInit {
  private postsService = inject(PostsService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  user = this.userService.getCurrentUser();
  posts = this.postsService.userPosts;
  ngOnInit(): void {
      this.postsService.getPostsByUser(this.user());
  }
  openNewPostDialog() {
    this.dialog.open(NewPostFormComponent);
  }
  editPost(id:number){

  }
}
