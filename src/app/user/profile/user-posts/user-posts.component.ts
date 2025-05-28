import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from '../../../feed/post/post.component';
import { PostsService } from '../../../feed/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NewPostFormComponent } from '../../../feed/new-post-form/new-post-form.component';
import { UserService } from '../../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../app.model';

@Component({
  selector: 'app-user-posts',
  imports: [PostComponent, MatIconModule, MatButtonModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent implements OnInit {
  private postsService = inject(PostsService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  
  currentUser = this.userService.getCurrentUser();
  posts = this.postsService.userPosts;
  profileUser: User | null = null;

  ngOnInit(): void {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      this.userService.getUserByEmail(email).subscribe(user => {
        if (user) {
          this.profileUser = user;
          this.postsService.getPostsByUser(user);
        }
      });
    }
  }

  openNewPostDialog() {
    this.dialog.open(NewPostFormComponent);
  }

  isOwnProfile(): boolean {
    return this.currentUser()?.email === this.profileUser?.email;
  }
}
